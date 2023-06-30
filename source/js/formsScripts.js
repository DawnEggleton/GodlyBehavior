presetForms();
let storedHTML;

/********** Form Submissions **********/
//new board form
document.querySelector('#form-board').addEventListener('submit', e => {
    e.preventDefault();
    let member = e.currentTarget.querySelector('#name').value.toLowerCase().trim();
    let id = e.currentTarget.querySelector('#id').value;
    let board = e.currentTarget.querySelector('#board-title').value.toLowerCase().trim();
    let location = e.currentTarget.querySelector('#location').value.toLowerCase().trim();
    let notes = e.currentTarget.querySelector('#notes').value.trim();
    let embedTitle = `New Board Requested`;
    let message = `${capitalize(member)} (ID: ${id}) has requested a board titled **${capitalize(board)}** within **${location}**\n\n**Notes:**\n${notes}\n\nPlease react when you have handled this request.`;
    sendModRequest('board', message, embedTitle); 
});

//thread mod form
document.querySelector('#form-thread').addEventListener('submit', e => {
    e.preventDefault();
    let member = e.currentTarget.querySelector('#name').value.toLowerCase().trim();
    let id = e.currentTarget.querySelector('#id').value;
    let thread = e.currentTarget.querySelector('#url').value.toLowerCase().trim();
    let status = e.currentTarget.querySelector('#status').options[e.currentTarget.querySelector('#status').selectedIndex].innerText;
    let destination = e.currentTarget.querySelector('#destination').value.toLowerCase().trim();
    let embedTitle = `Thread Moderation Required`;
    let message = ``;

    if(status === 'Unarchive') {
        message = `${capitalize(member)} (ID: ${id}) has requested that the following thread be removed from archives. Please move the thread accordingly and then react to this message.\n\n**Destination:** ${destination}`;
    } else {
        message = `${capitalize(member)} (ID: ${id}) has requested that the following thread be archived (${status}). Please move the thread accordingly and then react to this message.\n`;
    }

    message += `\n**Thread:** <${thread}>`;
    sendModRequest('thread', message, embedTitle); 
});

//account mod form
document.querySelector('#form-account').addEventListener('submit', e => {
    e.preventDefault();
    let member = e.currentTarget.querySelector('#name').value.toLowerCase().trim();
    let id = e.currentTarget.querySelector('#id').value;
    let character = document.querySelector('#character').value.toLowerCase().trim();
    let request = e.currentTarget.querySelector('#request').value.trim();
    let embedTitle = `Account Moderation Required`;
    let message = `${capitalize(member)} (ID: ${id}) has requested account updates for ${capitalize(character)}\n\n**Request:**\n${request}`;
    sendModRequest('account', message, embedTitle); 
});

//other mod form
document.querySelector('#form-other').addEventListener('submit', e => {
    e.preventDefault();
    let member = e.currentTarget.querySelector('#name').value.toLowerCase();
    let id = e.currentTarget.querySelector('#id').value;
    let request = e.currentTarget.querySelector('#request').value.trim();
    let embedTitle = `Miscellaneous Moderation Required`;
    let message = `${capitalize(member)} (ID: ${id}) has made a mod request.\n\n**Request:**\n${request}`;
    sendModRequest('other', message, embedTitle); 
});

//love form
document.querySelector('#form-love').addEventListener('submit', e => {
    e.preventDefault();
    let member = e.currentTarget.querySelector('#name').value.toLowerCase();
    let id = e.currentTarget.querySelector('#id').value;
	let ip = document.querySelector('#ip').value;
    let message = e.currentTarget.querySelector('#message').value.trim();
    let privateTitle = `Sent by: ||${capitalize(member)} (#${id}) on IP ${ip}||`;


    //Send Public
    sendModRequest('love', message, ``, `DISCORDHOOK`, `Thanks for your submission!`); 

    //Send Private
    sendDiscordMessage(`https://discord.com/api/webhooks/1124055171631153232/YKeNp50D2xwmU5pNg1HLn8dZFov9KtUX6UPKfhT7XYkIcFBI54xejAyYCMt3qZc-ApUn`, message, privateTitle); 
});

//character announcement
document.querySelector('#form-announce').addEventListener('submit', e => {
    e.preventDefault();
	let member = document.querySelector('#member').value.toLowerCase().trim();
	let character = document.querySelector('#character').value.toLowerCase().trim();
	let account = document.querySelector('#account').value.trim();
	let group = document.querySelector('#group').options[document.querySelector('#group').selectedIndex].innerText.toLowerCase().trim();
	let groupColor = colors[group];
	let hooks = document.querySelector('#about').value.trim();
    let embedTitle = `Welcome to ${capitalize(character)}`;
	let message = `${capitalize(character)} is played by ${capitalize(member)} and was sorted into ${capitalize(group)}.\n\n**Plot Hooks:**\n${hooks}\n\n**Read more:**\n<https://godlybehaviour.jcink.net/?showuser=${account}>`;

	sendModRequest('announce', message, embedTitle, `DISCORDHOOK`, submissionResponse = `Announcement submitted!`, null, groupColor); 
});

//claims submit
document.querySelector('#form-sort').addEventListener('submit', e => {
    e.preventDefault();

    let form = e.currentTarget;
    let member = e.currentTarget.querySelector('#member').value.toLowerCase().trim();
    let memberID = e.currentTarget.querySelector('#memberid').value.trim();
    let character = e.currentTarget.querySelector('#character').value.toLowerCase().trim();
    let characterID = e.currentTarget.querySelector('#characterid').value.trim();
    let groupField = e.currentTarget.querySelector('#group');
    let group = groupField.options[groupField.selectedIndex].innerText.toLowerCase().trim();
    let groupID = groupField.options[groupField.selectedIndex].value;
    let face = e.currentTarget.querySelector('#face').value.toLowerCase().trim();
    let jobs = ``;
    if(e.currentTarget.querySelector('#employed').options[e.currentTarget.querySelector('#employed').selectedIndex].value === 'y') {
        let employers = form.querySelectorAll('.employer input');
        let positions = form.querySelectorAll('.job input');
        for(let i = 0; i < employers.length; i++) {
            jobs += `{"employer": "${employers[i].value.toLowerCase().trim()}", "position": "${positions[i].value.toLowerCase().trim()}"}`;
            if(i !== employers.length - 1) {
                jobs += `+`;
            }
        }
    }
    let firstCharacter = e.currentTarget.querySelector('#first').options[e.currentTarget.querySelector('#first').selectedIndex].innerText;
    let wanted = e.currentTarget.querySelector('#request').options[e.currentTarget.querySelector('#request').selectedIndex].value === 'y' ? 'Yes' : 'No';
    let wantedURLs = e.currentTarget.querySelector('#request-data').value;
    let plot = e.currentTarget.querySelector('#plot').options[e.currentTarget.querySelector('#plot').selectedIndex].value !== '' ? e.currentTarget.querySelector('#plot').options[e.currentTarget.querySelector('#plot').selectedIndex].value : false;
    let role = false;
    if(plot) {
        role = e.currentTarget.querySelector('#role').options[e.currentTarget.querySelector('#role').selectedIndex].value;
    }

    let embedTitle = `${capitalize(member)} has requested sorting for ${capitalize(character)}`;
    let message = `${capitalize(character)} should be placed in the ${capitalize(group)} group.\n\n**Profile:** https://godlybehaviour.jcink.net/?showuser=${characterID}\n**Parent Account:** https://godlybehaviour.jcink.net/?showuser=${memberID}\n**First Character?** ${firstCharacter}\n**Requested?** ${wanted}`;
    if (wanted === 'Yes') {
        message += `\n${wantedURLs}`;
    }
    if(plot) {
        message += `\n\nThis character is part of the **${capitalize(plot)}** plot as **${capitalize(role)}**.\n\`\`\`<a href="?showuser=${characterID}">${capitalize(character)}</a>\`\`\``;
    }
    message += `\n\nPlease follow the sorting procedure, available in Processes > #sorting of this Discord server. React to this notification when you begin reviewing the application.`;

    let publicTitle = `${capitalize(member)} has finished ${capitalize(character)}!`;
    let publicMessage = `**Learn More:** <https://godlybehaviour.jcink.net/?showuser=${characterID}>`;
    if (wanted === 'Yes') {
        publicMessage += `\n\n*This character fills one or more requests. Members managing those requests will be contacted prior to character approval and sorting.*`;
    }

    let data = {
        member: member,
        memberID: memberID,
        character: character,
        characterID: characterID,
        group: group,
        groupID: groupID,
        face: face,
        jobs: jobs
    }
    let discord = {
        staffTitle: embedTitle,
        staffMessage: message,
        publicTitle: publicTitle,
        publicMessage: publicMessage
    }

    submitClaims(data, discord);
});

//claims edit
document.querySelector('#form-edit').addEventListener('submit', e => {
    e.preventDefault();

    let form = e.currentTarget;
    let member = form.querySelector('#member').value.toLowerCase().trim();
    let character = form.querySelector('#character').value.toLowerCase().trim();
    let characterID = form.querySelector('#characterid').value.trim();
    let groupField = form.querySelector('#group');
    let group = groupField.options[groupField.selectedIndex].innerText.toLowerCase().trim();
    let groupID = groupField.options[groupField.selectedIndex].value;
    let selectedChanges = Array.prototype.slice.call(form.querySelectorAll('[name="update"]')).filter(item => item.checked).map(item => item.value);

    let data = {
        member: member,
        character: character,
        characterID: characterID,
        group: group,
        groupID: groupID,
        selectedChanges: selectedChanges,
    }

    editClaims(data);
});

/********** Toggle Fields **********/
//Thread Status
document.querySelector('#form-thread #status').addEventListener('change', e => {
    if(e.currentTarget.options[e.currentTarget.selectedIndex].value === 'unarchive') {
        document.querySelectorAll('#form-thread .ifUnarchive').forEach(item => item.classList.remove('hide'));
        document.querySelectorAll('#form-thread .ifUnarchive input').forEach(item => item.setAttribute('required', true));
    } else {
        document.querySelectorAll('#form-thread .ifUnarchive').forEach(item => item.classList.add('hide'));
        document.querySelectorAll('#form-thread .ifUnarchive input').forEach(item => item.removeAttribute('required'));
    }
});

//Sorting Request Y/N
document.querySelector('#form-sort #request').addEventListener('change', e => {
    if(e.currentTarget.options[e.currentTarget.selectedIndex].value === 'y') {
        document.querySelectorAll('#form-sort .ifRequest').forEach(item => item.classList.remove('hide'));
        document.querySelectorAll('#form-sort .ifRequest input').forEach(item => item.setAttribute('required', true));
    } else {
        document.querySelectorAll('#form-sort .ifRequest').forEach(item => item.classList.add('hide'));
        document.querySelectorAll('#form-sort .ifRequest input').forEach(item => item.removeAttribute('required'));
    }
});

//Sorting Employed Y/N
document.querySelector('#form-sort #employed').addEventListener('change', e => {
    if(e.currentTarget.options[e.currentTarget.selectedIndex].value === 'y') {
        document.querySelectorAll('#form-sort .ifEmployed').forEach(item => item.classList.remove('hide'));
        loadJobs('sort');
    } else {
        document.querySelectorAll('#form-sort .ifEmployed').forEach(item => item.classList.add('hide'));
        removeJobs('sort');
    }
});

//Sorting Subplot Y/N
document.querySelector('#form-sort #plot').addEventListener('change', e => {
    let selected = e.currentTarget.options[e.currentTarget.selectedIndex].value;
    if(selected === 'hunter') {
        document.querySelectorAll('#form-sort .ifPlot option').forEach(item => item.classList.add('hide'));
        document.querySelectorAll('#form-sort .ifPlot').forEach(item => item.classList.remove('hide'));
        document.querySelectorAll('#form-sort .ifPlot select').forEach(item => item.removeAttribute('required'));
        document.querySelectorAll('#form-sort .ifHunter').forEach(item => item.classList.remove('hide'));
    } else if (selected === 'conspiracy') {
        document.querySelectorAll('#form-sort .ifPlot option').forEach(item => item.classList.add('hide'));
        document.querySelectorAll('#form-sort .ifPlot').forEach(item => item.classList.remove('hide'));
        document.querySelectorAll('#form-sort .ifPlot select').forEach(item => item.removeAttribute('required'));
        document.querySelectorAll('#form-sort .ifConspiracy').forEach(item => item.classList.remove('hide'));
    } else if (selected === 'cult') {
        document.querySelectorAll('#form-sort .ifPlot option').forEach(item => item.classList.add('hide'));
        document.querySelectorAll('#form-sort .ifPlot').forEach(item => item.classList.remove('hide'));
        document.querySelectorAll('#form-sort .ifPlot select').forEach(item => item.removeAttribute('required'));
        document.querySelectorAll('#form-sort .ifCult').forEach(item => item.classList.remove('hide'));
    } else {
        document.querySelectorAll('#form-sort .ifPlot').forEach(item => item.classList.add('hide'));
    }
});

//Job Count Change
document.querySelector('#form-sort #job-count').addEventListener('change', e => {
    let active = document.querySelector('#form-sort #jobs-clip');
    let currentCount = active.querySelectorAll('.job').length;
    let newCount = parseInt(e.currentTarget.value);
    if (newCount > currentCount) {
        for(let i = currentCount; i < newCount; i++) {
            active.insertAdjacentHTML('beforeend', addJobFields(i));
        }
    } else if (currentCount > newCount) {
        let difference = currentCount - newCount;
        for(let i = 0; i < difference; i++) {
            active.querySelectorAll('.employer')[currentCount - i - 1].remove();
            active.querySelectorAll('.job')[currentCount - i - 1].remove();
        }
    }
});

//Add Jobs Change
document.querySelector('#form-edit #choice-job-add').addEventListener('change', e => {
    if(e.currentTarget.checked) {
        document.querySelectorAll('#form-edit .ifAddJobs').forEach(item => item.classList.remove('hide'));
        loadJobs('edit');
    } else {
        document.querySelectorAll('#form-edit .ifAddJobs').forEach(item => item.classList.add('hide'));
        removeJobs('edit');
    }
});

//Add Job Count Change
document.querySelector('#form-edit #job-count').addEventListener('change', e => {
    let active = document.querySelector('#form-edit #jobs-clip');
    let currentCount = active.querySelectorAll('.job').length;
    let newCount = parseInt(e.currentTarget.value);
    if (newCount > currentCount) {
        for(let i = currentCount; i < newCount; i++) {
            active.insertAdjacentHTML('beforeend', addJobFields(i));
        }
    } else if (currentCount > newCount) {
        let difference = currentCount - newCount;
        for(let i = 0; i < difference; i++) {
            active.querySelectorAll('.employer')[currentCount - i - 1].remove();
            active.querySelectorAll('.job')[currentCount - i - 1].remove();
        }
    }
});

//Edit Jobs Change
document.querySelector('#form-edit #choice-job-edit').addEventListener('change', e => {
    if(e.currentTarget.checked) {
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
});

//Remove Jobs Change
document.querySelector('#form-edit #choice-job-remove').addEventListener('change', e => {
    if(e.currentTarget.checked) {
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
});

//Character ID Change
document.querySelector('#form-edit #characterid').addEventListener('change', e => {
    let editJobBox = document.querySelector('#form-edit #choice-job-edit');
    let removeJobBox = document.querySelector('#form-edit #choice-job-remove');
    let id = e.currentTarget.value.trim();

    console.log(editJobBox.checked);

    if(id && id !== '' && editJobBox.checked) {
        loadExistingJobs('edit', id);
    } else if(id && id !== '' && removeJobBox.checked) {
        loadExistingJobs('remove', id);
    }
});