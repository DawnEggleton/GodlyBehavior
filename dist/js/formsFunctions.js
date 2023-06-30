function sendDiscordMessage(webhook, message, embedTitle, notification = null, color = null) {
    const request = new XMLHttpRequest();
    request.open("POST", webhook);

    request.setRequestHeader('Content-type', 'application/json');

    const params = {
        "content": notification,
        "embeds": [
            {
            "title": embedTitle,
            "description": message,
            "color": parseInt(color, 16)
            }
        ],
        "attachments": []
	};

    request.send(JSON.stringify(params));
}

function sendModRequest(type, message, embedTitle, hook = `DISCORDHOOK`, submissionResponse = `Thank you for your submission! The staff have received your requst and should have it completed in 24-48 hours.`, notification = null, color = null) {

	let form = document.querySelector(`#form-${type}`);
	storedHTML = form.innerHTML;
    form.querySelector('[type="submit"]').innerText = 'Submitting...';
    $(form).trigger('reset');

	sendDiscordMessage(hook, message, embedTitle, notification, color);

	form.innerHTML = `<blockquote class="fullWidth">${submissionResponse}</blockquote>
    <button onclick="reloadForm(this)" type="button" class="fullWidth">Back to form</button>`;

    window.scrollTo(0, 0);
}

function reloadForm(e) {
	e.parentNode.innerHTML = storedHTML;
    if(e.parentNode && e.parentNode.querySelector('.warning')) {
        e.parentNode.querySelector('.warning').remove();
    }
}

function presetForms() {
    //Thread Mod Form
    let threadStatus = document.querySelector('#form-thread #status');
    if(threadStatus.options[threadStatus.selectedIndex].value === 'unarchive') {
        document.querySelectorAll('#form-thread .ifUnarchive').forEach(item => item.classList.remove('hide'));
        document.querySelectorAll('#form-thread .ifUnarchive input').forEach(item => item.setAttribute('required', true));
    } else {
        document.querySelectorAll('#form-thread .ifUnarchive').forEach(item => item.classList.add('hide'));
        document.querySelectorAll('#form-thread .ifUnarchive input').forEach(item => item.removeAttribute('required'));
    }

    //Sorting Requests
    let requestStatus = document.querySelector('#form-sort #request');
    if(requestStatus.options[requestStatus.selectedIndex].value === 'y') {
        document.querySelectorAll('#form-sort .ifRequest').forEach(item => item.classList.remove('hide'));
        document.querySelectorAll('#form-sort .ifRequest input').forEach(item => item.setAttribute('required', true));
    } else {
        document.querySelectorAll('#form-sort .ifRequest').forEach(item => item.classList.add('hide'));
        document.querySelectorAll('#form-sort .ifRequest input').forEach(item => item.removeAttribute('required'));
    }

    //Sorting Plots
    let plotStatus = document.querySelector('#form-sort #plot');
    let selectedPlot = plotStatus.options[plotStatus.selectedIndex].value;
    if(selectedPlot === 'hunter') {
        document.querySelectorAll('#form-sort .ifPlot option').forEach(item => item.classList.add('hide'));
        document.querySelectorAll('#form-sort .ifPlot').forEach(item => item.classList.remove('hide'));
        document.querySelectorAll('#form-sort .ifPlot select').forEach(item => item.removeAttribute('required'));
        document.querySelectorAll('#form-sort .ifHunter').forEach(item => item.classList.remove('hide'));
    } else if (selectedPlot === 'conspiracy') {
        document.querySelectorAll('#form-sort .ifPlot option').forEach(item => item.classList.add('hide'));
        document.querySelectorAll('#form-sort .ifPlot').forEach(item => item.classList.remove('hide'));
        document.querySelectorAll('#form-sort .ifPlot select').forEach(item => item.removeAttribute('required'));
        document.querySelectorAll('#form-sort .ifConspiracy').forEach(item => item.classList.remove('hide'));
    } else if (selectedPlot === 'cult') {
        document.querySelectorAll('#form-sort .ifPlot option').forEach(item => item.classList.add('hide'));
        document.querySelectorAll('#form-sort .ifPlot').forEach(item => item.classList.remove('hide'));
        document.querySelectorAll('#form-sort .ifPlot select').forEach(item => item.removeAttribute('required'));
        document.querySelectorAll('#form-sort .ifCult').forEach(item => item.classList.remove('hide'));
    } else {
        document.querySelectorAll('#form-sort .ifPlot').forEach(item => item.classList.add('hide'));
    }

    //Sorting Jobs
    let jobStatus = document.querySelector('#form-sort #employed');
    if(jobStatus.options[jobStatus.selectedIndex].value === 'y') {
        document.querySelectorAll('#form-sort .ifEmployed').forEach(item => item.classList.remove('hide'));
        loadJobs('sort');
    } else {
        document.querySelectorAll('#form-sort .ifEmployed').forEach(item => item.classList.add('hide'));
        removeJobs('sort');
    }

    //Edit Jobs
    let addJobsBox = document.querySelector('#form-edit #choice-job-add');
    let editJobsBox = document.querySelector('#form-edit #choice-job-edit');
    let removeJobsBox = document.querySelector('#form-edit #choice-job-remove');


    if(addJobsBox.checked) {
        document.querySelectorAll('#form-edit .ifAddJobs').forEach(item => item.classList.remove('hide'));
        loadJobs('edit');
    } else {
        document.querySelectorAll('#form-edit .ifAddJobs').forEach(item => item.classList.add('hide'));
        removeJobs('edit');
    }

    if(editJobsBox.checked) {
        document.querySelectorAll('#form-edit .ifEditJobs').forEach(item => item.classList.remove('hide'));
        let id = document.querySelector('#form-edit #characterid').value.trim();
        if(id && id !== '') {
            loadExistingJobs('edit', id);
        } else {
            document.querySelector('#form-edit #edit-jobs-clip').innerHTML = `<blockquote class="fullWidth">Please enter the ID of an accepted character first.</blockquote>`;
        }
    } else {
        document.querySelectorAll('#form-edit .ifEditJobs').forEach(item => item.classList.add('hide'));
        document.querySelector(`#form-edit #edit-jobs-clip`).innerHTML = '';
    }

    if(removeJobsBox.checked) {
        document.querySelectorAll('#form-edit .ifRemoveJobs').forEach(item => item.classList.remove('hide'));
        let id = document.querySelector('#form-edit #characterid').value.trim();
        if(id && id !== '') {
            loadExistingJobs('remove', id);
        } else {
            document.querySelector('#form-edit #remove-jobs-clip').innerHTML = `<blockquote class="fullWidth">Please enter the ID of an accepted character first.</blockquote>`;
        }
    } else {
        document.querySelectorAll('#form-edit .ifRemoveJobs').forEach(item => item.classList.add('hide'));
        document.querySelector(`#form-edit #remove-jobs-clip`).innerHTML = '';
    }

    loadCredits();
}

function loadJobs(form) {
    let active = document.querySelector(`#form-${form} #jobs-clip`);
    let count = document.querySelector(`#form-${form} #job-count`).value;
    for(let i = 0; i < count; i++) {
        active.insertAdjacentHTML('beforeend', addJobFields(i));
    }
}
function loadExistingJobs(type, id) {
    fetch(`https://opensheet.elk.sh/1mrdIG_MZ-f0jBHb-8_5aRGCczs5f3sl5WglDF0D1XwU/Claims`)
    .then((response) => response.json())
    .then((claimsData) => {
        let character = claimsData.filter(item => item.AccountID === id)[0];
        let jobs = character.Jobs.split('+').map(item => JSON.parse(item));
        let html = ``;
        if(type === 'edit') {
            jobs.forEach((job, i) => {
                html += `<label>
                    <b class="h7" data-align="left">${capitalize(job.employer)}</b>
                    <input type="text" id="edit-job-${i}" data-employer="${job.employer}" data-position="${job.position}" placeholder="${capitalize(job.position)}" />
                </label>`;
            });
            document.querySelector('#form-edit #edit-jobs-clip').innerHTML = html;
        }
        if(type === 'remove') {
            jobs.forEach((job, i) => {
                html += `<label>
                    <input type="checkbox" name="remove" id="remove-job-${i}" value="job-${i}">
                    <strong class="checkbox">${job.employer} - ${job.position}</strong>
                </label>`;
            });
            document.querySelector('#form-edit #remove-jobs-clip').innerHTML = html;
        }
    });
}
function removeJobs(form) {
    document.querySelector(`#form-${form} #jobs-clip`).innerHTML = '';
}
function addJobFields(i) {
    let html = `<label class="employer">
        <b class="h7" data-align="left">Employer</b>
        <input type="text" id="employer-${i}" placeholder="Employer" required />
    </label>
    <label class="job">
        <b class="h7" data-align="left">Job Title</b>
        <input type="text" id="job-${i}" placeholder="Job Title" required />
    </label>`;
    return html;
}

function submitClaims(data, discord) {
	let form = document.querySelector(`#form-sort`);
	storedHTML = form.innerHTML;
    form.querySelector('[type="submit"]').innerText = 'Submitting...';
    if(form.querySelector('.warning')) {
        form.querySelector('.warning').remove();
    }

    fetch(`https://opensheet.elk.sh/1mrdIG_MZ-f0jBHb-8_5aRGCczs5f3sl5WglDF0D1XwU/Claims`)
    .then((response) => response.json())
    .then((claimsData) => {
        let existing = claimsData.filter(item => item.AccountID === data.characterID || item.AccountID === data.memberID);

        if(existing.length === 0) {
            $(form).trigger('reset');

            $.ajax({
                url: `https://script.google.com/macros/s/AKfycbx-PjF_7gGgm9QOilpWR6x_QGuKRys5Cjd3wbexK-P2hyxquvLreQW7meY567tPomB2/exec`,   
                data: {
                    "SubmissionType": "claims-submit",
                    "Member": data.member,
                    "Character": data.character,
                    "AccountID": data.characterID,
                    "ParentID": data.memberID,
                    "Group": data.group,
                    "GroupID": data.groupID,
                    "Face": data.face,
                    "Jobs": data.jobs,
                },
                method: "POST",
                type: "POST",
                dataType: "json", 
                success: function () {
                    sendDiscordMessage(`https://discord.com/api/webhooks/1124104686857883748/Dh42I7Eh6Gbe22wSEnQ21nQJxkr9v1TNPr7tVRrqkcKXc_Gw4Axt7XCBuOHAdocl40RA`, discord.staffMessage, discord.staffTitle);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('error');
                    document.querySelector('.form--sort-warning').innerHTML = `Whoops! The sheet connection didn't quite work. Please refresh the page and try again! If this persists, please open the console (ctrl + shift + J) and send Lux a screenshot of what's there.`;
                },
                complete: function () {
                    sendDiscordMessage(`DISCORDHOOK`, discord.publicMessage, discord.publicTitle, `<@&1124161240378392717>`);
        
                    $('#form-sort button[type="submit"]').text('Submit');
                    
                    form.innerHTML = `<blockquote class="fullWidth">Submission successful! Please refresh the guidebook and double check your claims. They may take up to a minute to display.</blockquote>
                    <button onclick="reloadForm(this)" type="button" class="fullWidth">Back to form</button>`;
                }
            });
        } else {
            form.insertAdjacentHTML('afterbegin', `<blockquote class="fullWidth warning">Uh-oh! Someone else already exists on the sheet with that ID. Please double check it's entered correctly and reach out to staff if you need help!</blockquote>`);
        
            $('#form-sort button[type="submit"]').text('Submit');
        }
        
        window.scrollTo(0, 0);
    });
    
    return false;
}

function editClaims(data) {
	let form = document.querySelector(`#form-edit`);
	storedHTML = form.innerHTML;
    form.querySelector('[type="submit"]').innerText = 'Submitting...';
    if(form.querySelector('.warning')) {
        form.querySelector('.warning').remove();
    }

    fetch(`https://opensheet.elk.sh/1mrdIG_MZ-f0jBHb-8_5aRGCczs5f3sl5WglDF0D1XwU/Claims`)
    .then((response) => response.json())
    .then((claimsData) => {
        let existing = claimsData.filter(item => item.AccountID === data.characterID);

        if(existing.length === 1) {
            existing = existing[0]
            let original = {...existing};
            let message = ``;

            if(data.selectedChanges.includes('alias')) {
                existing.Member = data.member;
                if(message !== '') {
                    message += `\n`
                }
                message += `**Alias Change:** From ${capitalize(original.Member)} to ${capitalize(existing.Member)}`;
            }
    
            if(data.selectedChanges.includes('name')) {
                existing.Character = data.character;
                if(message !== '') {
                    message += `\n`
                }
                message += `**Name Change:** From ${capitalize(original.Character)} to ${capitalize(existing.Character)}`;
            }
    
            if(data.selectedChanges.includes('group')) {
                existing.Group = data.group;
                existing.GroupID = data.groupID;
                if(message !== '') {
                    message += `\n`
                }
                message += `**Group Change:** From ${capitalize(original.Group)} to ${capitalize(existing.Group)}`;
            }
    
            if(data.selectedChanges.includes('job-add') || data.selectedChanges.includes('job-edit') || data.selectedChanges.includes('job-remove')) {
                let jobsArray = original.Jobs.split('+').map(item => JSON.parse(item));
                
                //remove jobs first
                if(data.selectedChanges.includes('job-remove')) {
                    let removedJobs = Array.prototype.slice.call(form.querySelectorAll('[name="remove"]'))
                        .filter(item => item.checked)
                        .map(item => parseInt(item.value.split('-')[1]));
                    removedJobs.forEach(job => {
                        jobsArray[job].employer = 'remove';
                        jobsArray[job].position = 'remove';
                    });
                    jobsArray = jobsArray.filter(item => item.employer !== 'remove' && item.position !== 'remove');
                }

                //then edit existing jobs
                if(data.selectedChanges.includes('job-edit')) {
                    let editedJobs = Array.prototype.slice.call(form.querySelectorAll('#edit-jobs-clip input'))
                    .filter(item => item.value !== '');

                    editedJobs.forEach(editJob => {
                        jobsArray.forEach(job => {
                            if(job.employer === editJob.dataset.employer && job.position === editJob.dataset.position) {
                                job.position = editJob.value;
                            }
                        });
                    });
                }

                //parse back to string
                let jobsString = jobsArray.map(item => JSON.stringify(item)).join('+');

                //then add new jobs
                if(data.selectedChanges.includes('job-add')) {
                    let addedEmployers = document.querySelectorAll('#form-edit #jobs-clip .employer input');
                    let addedJobs = document.querySelectorAll('#form-edit #jobs-clip .job input');
                    for(let i = 0; i < addedEmployers.length; i++) {
                        if(jobsArray.length > 0) {
                            jobsString += `+`;
                        }
                        jobsString += `{"employer": "${addedEmployers[i].value.toLowerCase().trim()}", "position": "${addedJobs[i].value.toLowerCase().trim()}"}`;
                        if(i !== addedEmployers.length - 1) {
                            jobsString += `+`;
                        }
                    }
                }

                existing.Jobs = jobsString;

                //now do message
                let originalList = original.Jobs.split('+').map(item => JSON.parse(item));
                let newList = jobsString.split('+').map(item => JSON.parse(item));

                if(message !== '') {
                    message += `\n\n`
                }

                message += `**Jobs Updated From:**`;
                originalList.forEach(job => {
                    message += `\n${capitalize(job.employer)} - *${capitalize(job.position)}*`;
                });

                message += `\n\n**Jobs Updated To:**`;
                newList.forEach(job => {
                    message += `\n${capitalize(job.employer)} - *${capitalize(job.position)}*`;
                })
            }
    
            if(data.selectedChanges.includes('group')) {
                message += `\n\nPlease change the account's member group in the Admin CP before marking this log as reviewed.`;
            }

            let embedTitle = `${capitalize(data.member)} has made edits to ${capitalize(data.character)} (#${data.characterID})`;
            
            $(form).trigger('reset');

            $.ajax({
                url: `https://script.google.com/macros/s/AKfycbx-PjF_7gGgm9QOilpWR6x_QGuKRys5Cjd3wbexK-P2hyxquvLreQW7meY567tPomB2/exec`,   
                data: {
                    "SubmissionType": "claims-edit",
                    "Member": existing.Member,
                    "Character": existing.Character,
                    "AccountID": existing.AccountID,
                    "ParentID": existing.ParentID,
                    "Group": existing.Group,
                    "GroupID": existing.GroupID,
                    "Face": existing.Face,
                    "Jobs": existing.Jobs,
                },
                method: "POST",
                type: "POST",
                dataType: "json", 
                success: function () {
                    sendDiscordMessage(`DISCORDHOOK`, message, embedTitle);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('error');
                    document.querySelector('.form--sort-warning').innerHTML = `Whoops! The sheet connection didn't quite work. Please refresh the page and try again! If this persists, please open the console (ctrl + shift + J) and send Lux a screenshot of what's there.`;
                },
                complete: function () {
                    $('#form-sort button[type="submit"]').text('Submit');
                    form.innerHTML = `<blockquote class="fullWidth">Submission successful! Please refresh the guidebook and double check your claims. They may take up to a minute to display.</blockquote>
                    <button onclick="reloadForm(this)" type="button" class="fullWidth">Back to form</button>`;
                }
            });
        } else {
            form.insertAdjacentHTML('afterbegin', `<blockquote class="fullWidth warning">Uh-oh! This character doesn't exist on the sheet. Have they been <a href="#sort">sorted</a> yet?</blockquote>`);
        
            $('#form-sort button[type="submit"]').text('Submit');
        }
        
        window.scrollTo(0, 0);
    });
    
    return false;
}

//Face Reserve form
function submitReserves(data, discord) {
	let form = document.querySelector(`#form-reserve`);
	storedHTML = form.innerHTML;
    form.querySelector('[type="submit"]').innerText = 'Submitting...';
    if(form.querySelector('.warning')) {
        form.querySelector('.warning').remove();
    }

    fetch(`https://opensheet.elk.sh/1mrdIG_MZ-f0jBHb-8_5aRGCczs5f3sl5WglDF0D1XwU/Claims`)
    .then((response) => response.json())
    .then((claimData) => {
        let created = claimData.filter(item => item.Face === data.face);
        if(created.length > 0) {
            if(form.querySelector('.warning')) {
                form.querySelector('.warning').remove();
            }
            form.insertAdjacentHTML('afterbegin', `<blockquote class="fullWidth warning">Uh-oh! This face is already in play! Maybe we can help you find another option - check the #face-help channel in Discord!</blockquote>`);
        } else {

            fetch(`https://opensheet.elk.sh/1mrdIG_MZ-f0jBHb-8_5aRGCczs5f3sl5WglDF0D1XwU/Reserves`)
            .then((response) => response.json())
            .then((reserveData) => {
                let existing = reserveData.filter(item => item.Face === data.face);
        
                if(existing.length > 0) {
                    existing.forEach((reserve, i) => {
                        let current = new Date();
                        let time = new Date(reserve.Timestamp);
                        let difference = Math.floor(((current - time) / (1000*60*60*24)));
                        console.log(current);
                        console.log(time);
                        console.log(difference);
                        if(difference < 8) {
                            if(form.querySelector('.warning')) {
                                form.querySelector('.warning').remove();
                            }
                            form.insertAdjacentHTML('afterbegin', `<blockquote class="fullWidth warning">Uh-oh! Someone else has an active reservation on that face already. Maybe we can help you find another option - check the #face-help channel in Discord!</blockquote>`);
                        
                            $('#form-sort button[type="submit"]').text('Submit');
                        } else {
                            existing.splice(i, 1);
                        }
                    });
                    if(existing.length > 0) {
                        if(form.querySelector('.warning')) {
                            form.querySelector('.warning').remove();
                        }
                        form.insertAdjacentHTML('afterbegin', `<blockquote class="fullWidth warning">Uh-oh! Someone else has an active reservation on that face already. Maybe we can help you find another option - check the #face-help channel in Discord!</blockquote>`);
                    
                        $('#form-sort button[type="submit"]').text('Submit');
                    } else {
                        addReserve(form, data, discord);
                    }
                } else {
                    addReserve(form, data, discord);
                }
            });
        }
    });
    
    return false;
}
function addReserve(form, data, discord) {
    $(form).trigger('reset');
    
    $.ajax({
        url: `https://script.google.com/macros/s/AKfycbx-PjF_7gGgm9QOilpWR6x_QGuKRys5Cjd3wbexK-P2hyxquvLreQW7meY567tPomB2/exec`,   
        data: {
            "SubmissionType": "reserve-submit",
            "Member": data.member,
            "Face": data.face,
        },
        method: "POST",
        type: "POST",
        dataType: "json", 
        success: function () {
            sendDiscordMessage(`https://discord.com/api/webhooks/1124335641191260251/x_KFeOHJ32QKIcmCuVa4qwzEJLrlc0BP61kTaT3YANJSnhZ77GqiDt0d17M7TinPT1h2`, discord.staffMessage, discord.staffTitle);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error');
            document.querySelector('.form--sort-warning').innerHTML = `Whoops! The sheet connection didn't quite work. Please refresh the page and try again! If this persists, please open the console (ctrl + shift + J) and send Lux a screenshot of what's there.`;
        },
        complete: function () {
            $('#form-reserve button[type="submit"]').text('Submit');
            
            form.innerHTML = `<blockquote class="fullWidth">Submission successful! Reminder that face reserves will automatically expire in exactly 7 days from submission.</blockquote>
            <button onclick="reloadForm(this)" type="button" class="fullWidth">Back to form</button>`;

            window.scrollTo(0, 0);
        }
    });
}

//Species form
function submitSpecies(data, discord) {
	let form = document.querySelector(`#form-species-add`);
	storedHTML = form.innerHTML;
    form.querySelector('[type="submit"]').innerText = 'Submitting...';
    if(form.querySelector('.warning')) {
        form.querySelector('.warning').remove();
    }
    $(form).trigger('reset');

    $.ajax({
        url: `https://script.google.com/macros/s/AKfycbx-PjF_7gGgm9QOilpWR6x_QGuKRys5Cjd3wbexK-P2hyxquvLreQW7meY567tPomB2/exec`,   
        data: {
            "SubmissionType": "species-submit",
            "Species": data.species,
            "Aging": data.aging,
            "Lifespan": data.lifespan,
            "Physiology": data.physiology,
            "CommunityStructure": data.community,
            "Strengths": data.abilities,
            "Weaknesses": data.weaknesses,
            "Traits": data.traits,
            "Credit": data.credits,
        },
        method: "POST",
        type: "POST",
        dataType: "json", 
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error');
            document.querySelector('.form--sort-warning').innerHTML = `Whoops! The sheet connection didn't quite work. Please refresh the page and try again! If this persists, please open the console (ctrl + shift + J) and send Lux a screenshot of what's there.`;
        },
        complete: function () {
            $('#form-sort button[type="submit"]').text('Submit');
            
            form.innerHTML = `<blockquote class="fullWidth">Submission successful!</blockquote>
            <button onclick="reloadForm(this)" type="button" class="fullWidth">Back to form</button>`;

            window.scrollTo(0, 0);
        }
    });
    
    return false;
}
function addCreditFields(i) {
    let html = `<label class="user-name">
        <b class="h7" data-align="left">Member</b>
        <input type="text" id="user-${i}" placeholder="Member" required />
    </label>
    <label class="user-id">
        <b class="h7" data-align="left">Member ID</b>
        <input type="text" id="id-${i}" placeholder="Member ID" required />
    </label>`;
    return html;
}
function loadCredits() {
    let active = document.querySelector(`#form-species-add #credit-clip`);
    let count = document.querySelector(`#form-species-add #credit-count`).value;
    for(let i = 0; i < count; i++) {
        active.insertAdjacentHTML('beforeend', addCreditFields(i));
    }
}