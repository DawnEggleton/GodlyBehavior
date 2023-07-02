/********** Settings **********/
function setTheme() {
    if(localStorage.getItem('theme') !== null) {
        switch(localStorage.getItem('theme')) {
            case 'light':
                document.querySelector('body').classList.remove('dark');
                document.querySelector('body').classList.add('light');
                break;
            case 'dark':
            default:
                document.querySelector('body').classList.add('dark');
                document.querySelector('body').classList.remove('light');
                break;
        }
    } else {
        document.querySelector('body').classList.add('dark');
        document.querySelector('body').classList.remove('light');
        localStorage.setItem('theme', 'dark');
    }
}
function setSize() {
    if(localStorage.getItem('size') !== null) {
        switch(localStorage.getItem('size')) {
            case 'large':
                document.querySelector('body').classList.remove('smFont');
                document.querySelector('body').classList.add('lgFont');
                break;
            case 'small':
            default:
                document.querySelector('body').classList.remove('lgFont');
                document.querySelector('body').classList.add('smFont');
                break;
        }
    } else {
        document.querySelector('body').classList.remove('lgFont');
        document.querySelector('body').classList.add('smFont');
        localStorage.setItem('size', 'small');
    }
}

/********** Initializations **********/
function initStickyMenu() {
    const sticky = document.querySelector('.nav--main');
    const breadcrumb = document.querySelector('.nav--breadcrumb');
    const webMenu = document.querySelector('.webpage--menu');
    const profileMenu = document.querySelector('.profile--menu');
    const initScroll = document.documentElement.scrollTop;
    if (initScroll > 0) {
        sticky.classList.add("is-sticky");
        breadcrumb.classList.add("is-sticky");
        if(webMenu) {
            webMenu.classList.add('is-sticky');
        }
        if(profileMenu) {
            profileMenu.classList.add('is-sticky');
        }
    }

    const headers = document.querySelectorAll('header');
    const visibleHeaders = [];
    headers.forEach(header => {
        if (window.getComputedStyle(header).display !== "none") {
            visibleHeaders.push(header);
        }
    });
    if(visibleHeaders.length === 0) {
        sticky.classList.add('no-header');
        breadcrumb.classList.add("no-header");
    }

    window.addEventListener('scroll', e => {
        const scroll = document.documentElement.scrollTop;
        if (scroll > 0) {
            sticky.classList.add("is-sticky");
            breadcrumb.classList.add("is-sticky");
            if(webMenu) {
                webMenu.classList.add('is-sticky');
            }
            if(profileMenu) {
                profileMenu.classList.add('is-sticky');
            }
        } else {
            sticky.classList.remove("is-sticky")
            breadcrumb.classList.remove("is-sticky");
            if(webMenu) {
                webMenu.classList.remove('is-sticky');
            }
            if(profileMenu) {
                profileMenu.classList.remove('is-sticky');
            }
        }
    });
}
function initSwitcher() {
	let characters = switcher.querySelectorAll('option');
	let newSwitch = `<div class="switch">`;
	characters.forEach((character, i) => {
		if(i !== 0) {
			let characterName = character.innerText.trim();
			let characterId = character.value;
            let siteString = `uploads2/godlybehaviour`;
			newSwitch += `<label class="switch-block">
				<input type="checkbox" value="${characterId}" onchange="this.form.submit()" name="sub_id" />
				<div style="background-image: url(https://files.jcink.net/${siteString}/av-${characterId}.png), url(https://files.jcink.net/${siteString}/av-${characterId}.gif), url(https://files.jcink.net/${siteString}/av-${characterId}.jpg), url(https://files.jcink.net/${siteString}/av-${characterId}.jpeg), url(https://picsum.photos/250);"></div>
				<b>${capitalize(characterName)}</b>
			</label>`;
		}
	});
	newSwitch += `</div>`;
	switcher.insertAdjacentHTML('afterend', newSwitch);
	switcher.remove();
}
function initQuickLogin() {
    if($('#quick-login').length) {
        $('#quick-login').appendTo('#quick-login-clip');
        document.querySelector('#quick-login-clip input[name="UserName"]').setAttribute('placeholder', 'Username');
        document.querySelector('#quick-login-clip input[name="PassWord"]').setAttribute('placeholder', 'Password');
    } else {
        var main_url = location.href.split('?')[0];
        $.get(main_url, function (data) {
            $('#quick-login', data).appendTo('#quick-login-clip');
            document.querySelector('#quick-login-clip input[name="UserName"]').setAttribute('placeholder', 'Username');
            document.querySelector('#quick-login-clip input[name="PassWord"]').setAttribute('placeholder', 'Password');
        });
    }
}
function initModals() {
    document.querySelectorAll('.popup').forEach(popup => {
        popup.addEventListener('click', () => {
            let modalTag = popup.dataset.modal,
                modals = document.querySelectorAll('.modal'),
                modal;
            for(let i = 0; i < modals.length; i++) {
                if(modals[i].dataset.modalBox === modalTag) {
                    modal = modals[i];
                    modal.classList.add('is-open');
                }
            }
        });
    });
    document.querySelectorAll('.modal').forEach(modal => {
        window.addEventListener('click', e => {
            if(e.target.classList.contains('modal') || e.target.classList.contains('modal--close') || (e.target.parentNode && e.target.parentNode.classList.contains('modal--close')) || (e.target.parentNode && e.target.parentNode.parentNode && e.target.parentNode.parentNode.classList.contains('modal--close'))) {
                modal.classList.remove('is-open');
            }
        });
    });
}
function initWebpages() {
    window.addEventListener('hashchange', function(e){
        //get hash
        let hash = $.trim( window.location.hash );
        let selected = document.querySelector(`.webpage--menu a[href="${hash}"]`);
        let selectedCategory = selected.parentNode.parentNode.parentNode.getAttribute('data-category');
        let hashMain = document.querySelector(`.webpage--menu tag-label[data-category="${selectedCategory}"]`);
        let hashCategory = document.querySelector(`.webpage--menu tag-tab[data-category="${selectedCategory}"]`);
        let hashTab = document.querySelector(`.webpage--content tag-tab[data-category="${selectedCategory}"]`);
        let hashContent = document.querySelector(`tag-tab[data-key="${hash}"]`);
        let unsetDefault = Array.from(selected.parentNode.children);
        let submenuSiblings = Array.from(hashTab.parentNode.children);
        let categorySiblings = Array.from(hashCategory.parentNode.children);
        let tabSiblings = Array.from(hashContent.parentNode.children);
        let submenuIndex = submenuSiblings.indexOf.call(submenuSiblings, hashTab);
        let categoryIndex = categorySiblings.indexOf.call(categorySiblings, hashCategory);
        let tabIndex = tabSiblings.indexOf.call(tabSiblings, hashContent);
        //find the sub menu/inner menu link with the matching hash
        if (hash) {
            $(selected).trigger('click');
        }
        //select based on this

        //Tabs
        //Remove active from everything
        document.querySelectorAll('.webpage--menu tag-label').forEach(label => label.classList.remove('is-active'));
        unsetDefault.forEach(label => label.classList.remove('is-active'));
        document.querySelectorAll('.webpage tag-tab').forEach(label => label.classList.remove('is-active'));

        //Add active
        hashMain.classList.add('is-active');
        selected.classList.add('is-active');
        hashTab.classList.add('is-active');
        hashContent.classList.add('is-active');
        selected.parentNode.parentNode.parentNode.classList.add('is-active');
        submenuSiblings.forEach(sibling => sibling.style.left = `${-100 * submenuIndex}%`);
        categorySiblings.forEach(sibling => sibling.style.left = `${-100 * categoryIndex}%`);
        tabSiblings.forEach(sibling => sibling.style.left = `${-100 * tabIndex}%`);
    });

    //hash linking
    if (window.location.hash){
        //get hash
        let hash = $.trim( window.location.hash );
        let selected = document.querySelector(`.webpage--menu a[href="${hash}"]`);
        let selectedCategory = selected.parentNode.parentNode.parentNode.getAttribute('data-category');
        let hashMain = document.querySelector(`.webpage--menu tag-label[data-category="${selectedCategory}"]`);
        let hashCategory = document.querySelector(`.webpage--menu tag-tab[data-category="${selectedCategory}"]`);
        let hashTab = document.querySelector(`.webpage--content tag-tab[data-category="${selectedCategory}"]`);
        let hashContent = document.querySelector(`tag-tab[data-key="${hash}"]`);
        let unsetDefault = Array.from(selected.parentNode.children);
        let submenuSiblings = Array.from(hashTab.parentNode.children);
        let categorySiblings = Array.from(hashCategory.parentNode.children);
        let tabSiblings = Array.from(hashContent.parentNode.children);
        let submenuIndex = submenuSiblings.indexOf.call(submenuSiblings, hashTab);
        let categoryIndex = categorySiblings.indexOf.call(categorySiblings, hashCategory);
        let tabIndex = tabSiblings.indexOf.call(tabSiblings, hashContent);
        //find the sub menu/inner menu link with the matching hash
        if (hash) {
            $(selected).trigger('click');
        }
        //select based on this

        //Tabs
        //Remove active from everything
        document.querySelectorAll('.webpage--menu tag-label').forEach(label => label.classList.remove('is-active'));
        unsetDefault.forEach(label => label.classList.remove('is-active'));
        document.querySelectorAll('.webpage tag-tab').forEach(label => label.classList.remove('is-active'));

        //Add active
        hashMain.classList.add('is-active');
        selected.classList.add('is-active');
        hashTab.classList.add('is-active');
        hashContent.classList.add('is-active');
        selected.parentNode.parentNode.parentNode.classList.add('is-active');
        submenuSiblings.forEach(sibling => sibling.style.left = `${-100 * submenuIndex}%`);
        categorySiblings.forEach(sibling => sibling.style.left = `${-100 * categoryIndex}%`);
        tabSiblings.forEach(sibling => sibling.style.left = `${-100 * tabIndex}%`);
    } else {
        //Auto-select  tab without hashtag present
        let firstTab = ``;
        let firstCat = ``;
        if(window.location.href.indexOf('showdatabase') > -1) { 
            firstTab = 'schedule';
            firstCat = 'info';
        } else {
            firstTab = 'etiquette';
            firstCat = 'required';
        }
        document.querySelector(`.webpage--menu a[href="#${firstTab}"]`).classList.add('is-active');
        document.querySelector(`.webpage--menu a[href="#${firstTab}"]`).parentNode.parentNode.parentNode.classList.add('is-active');
        document.querySelector(`.webpage--menu tag-label[data-category="${firstCat}"]`).classList.add('is-active');
        document.querySelector(`tag-tab[data-category="${firstCat}"] .webpage--section tag-tabset tag-tab:first-child`).classList.add('is-active');
    }
}
function initTabs() {
    if(document.querySelectorAll('tag-tabs').length > 0) {
        document.querySelectorAll('tag-tabs').forEach(tabset => {
            let labels = tabset.querySelectorAll('tag-label');
            let tabs = tabset.querySelectorAll('tag-tab');
            let secondary = tabset.dataset.secondary;
            let secondaryTabs;
            if(secondary) {
                secondaryTabs = document.querySelectorAll(`${secondary} > tag-tabset > tag-tab`);
                //functional tabs within tabs
                let innerSets = tabset.querySelectorAll('tag-tabset tag-labelset');
                innerSets.forEach((innerset, i) => {
                    let innerLabels = innerset.querySelectorAll('tag-labelset > a');
                    let innerTabs = secondaryTabs[i].querySelectorAll('tag-tab');
                    innerLabels.forEach((label, i) => {
                        label.addEventListener('click', () => {
                let siblingLabels = label.parentNode.querySelectorAll('a');
                let siblingTabs = innerTabs[i].parentNode.querySelectorAll('tag-tab');
                            siblingLabels.forEach(label => label.classList.remove('is-active'));
                            siblingTabs.forEach(tab => {
                                tab.classList.remove('is-active');
                                tab.style.left = `${-100 * i}%`;
                            });
                            innerLabels[i].classList.add('is-active');
                            innerTabs[i].classList.add('is-active');
                        });
                    });
                });
            }
            //regular tabs and moving the tab groups for secondary sets
            labels.forEach((label, i) => {
                label.addEventListener('click', () => {
                    labels.forEach(label => label.classList.remove('is-active'));
                    tabs.forEach(tab => {
                        tab.classList.remove('is-active');
                        tab.style.left = `${-100 * i}%`;
                    });
                    if(secondary) {
                        secondaryTabs.forEach(tab => {
                            tab.classList.remove('is-active');
                            tab.style.left = `${-100 * i}%`;
                        });
                    }
                    labels[i].classList.add('is-active');
            if(window.location.href.indexOf('showdatabase') > -1 || window.location.href.indexOf('guidebook') > -1) {
                        let autoLabel = document.querySelector(`tag-tab[data-category="${labels[i].dataset.category}"]`).querySelector('.is-active').getAttribute('href');
                        window.location.hash = autoLabel;
            }
                    tabs[i].classList.add('is-active');
                    if(secondary) {
                        secondaryTabs[i].classList.add('is-active');
                    }
                })
            });
        });
    }
}
function initMenuToggles() {
    document.querySelectorAll('#ucpmenu b').forEach(header => {
        header.addEventListener('click', e => {
            e.currentTarget.classList.toggle('is-closed');
        });
    });
}
function initProfile() {
    window.addEventListener('hashchange', function(e){
        //get hash
        let hash = window.location.hash;
        let selected = document.querySelector(`.profile a[href="${hash}"]`);
        let hashContent = document.querySelector(`tag-tab[data-key="${hash}"]`);
        let unsetDefault = Array.from(selected.parentNode.children);
        let tabSiblings = Array.from(hashContent.parentNode.children);
        let tabIndex = tabSiblings.indexOf.call(tabSiblings, hashContent);

        //check for tracker category and adjust
        let innerTab = null, tabParent, parentSiblings, parentIndex;
        if(selected.dataset.category) {
            innerTab = selected;
            selected = document.querySelector(`.profile--menu a[href="#${selected.dataset.category}"]`);
            hashContent = document.querySelector(`tag-tab[data-key="${hash}"]`);
            tabParent = document.querySelector(`tag-tab[data-key="#${innerTab.dataset.category}"]`);
            parentSiblings = Array.from(tabParent.parentNode.children);
            parentIndex = parentSiblings.indexOf.call(parentSiblings, tabParent);
        }

        //find the sub menu/inner menu link with the matching hash
        if (hash) {
            $(selected).trigger('click');
        }
        //select based on this

        //Tabs
        //Remove active from everything
        document.querySelectorAll('.profile--menu a').forEach(label => label.classList.remove('is-active'));
        unsetDefault.forEach(label => label.classList.remove('is-active'));
        document.querySelectorAll('.profile tag-tab').forEach(label => label.classList.remove('is-active'));
        if(innerTab) {
            Array.from(innerTab.parentNode.children).forEach(label => label.classList.remove('is-active'));
        }

        //Add active
        selected.classList.add('is-active');
        hashContent.classList.add('is-active');
        tabSiblings.forEach(sibling => sibling.style.left = `${-100 * tabIndex}%`);
        if(innerTab) {
            innerTab.classList.add('is-active');
            tabParent.classList.add('is-active');
            parentSiblings.forEach(sibling => sibling.style.left = `${-100 * parentIndex}%`);
        }
    });

    //hash linking
    if (window.location.hash){
        //get hash
        let hash = window.location.hash;
        let selected = document.querySelector(`.profile a[href="${hash}"]`);
        let hashContent = document.querySelector(`tag-tab[data-key="${hash}"]`);
        let unsetDefault = Array.from(selected.parentNode.children);
        let tabSiblings = Array.from(hashContent.parentNode.children);
        let tabIndex = tabSiblings.indexOf.call(tabSiblings, hashContent);

        //check for tracker category and adjust
        let innerTab = null, tabParent, parentSiblings, parentIndex;
        if(selected.dataset.category) {
            innerTab = selected;
            selected = document.querySelector(`.profile--menu a[href="#${selected.dataset.category}"]`);
            hashContent = document.querySelector(`tag-tab[data-key="${hash}"]`);
            tabParent = document.querySelector(`tag-tab[data-key="#${innerTab.dataset.category}"]`);
            parentSiblings = Array.from(tabParent.parentNode.children);
            parentIndex = parentSiblings.indexOf.call(parentSiblings, tabParent);
        }

        //find the sub menu/inner menu link with the matching hash
        if (hash) {
            $(selected).trigger('click');
        }
        //select based on this

        //Tabs
        //Remove active from everything
        document.querySelectorAll('.profile--menu a').forEach(label => label.classList.remove('is-active'));
        unsetDefault.forEach(label => label.classList.remove('is-active'));
        document.querySelectorAll('.profile tag-tab').forEach(label => label.classList.remove('is-active'));
        if(innerTab) {
            Array.from(innerTab.parentNode.children).forEach(label => label.classList.remove('is-active'));
        }

        //Add active
        selected.classList.add('is-active');
        hashContent.classList.add('is-active');
        tabSiblings.forEach(sibling => sibling.style.left = `${-100 * tabIndex}%`);
        if(innerTab) {
            innerTab.classList.add('is-active');
            tabParent.classList.add('is-active');
            parentSiblings.forEach(sibling => sibling.style.left = `${-100 * parentIndex}%`);
        }
    } else {
        //Auto-select  tab without hashtag present
        document.querySelector(`.profile--menu a`).classList.add('is-active');
        document.querySelector(`.profile--content tag-tabset tag-tab:first-child`).classList.add('is-active');
        document.querySelector(`.profile--tracker-menu a`).classList.add('is-active');
        document.querySelector(`.profile--tracker-content tag-tabset tag-tab:first-child`).classList.add('is-active');
    }
}
function initForumLinks() {
    document.querySelectorAll('.forum--manual-links').forEach(linkset => {
        if(linkset.innerHTML !== '') {
            let subforums = linkset.parentNode.querySelector('.forum--links');
            if (subforums.innerHTML === '') {
                subforums.innerHTML = linkset.innerHTML;
            } else {
                subforums.querySelector('.subforums').insertAdjacentHTML('beforeend', linkset.innerHTML);
            }
        }
        linkset.remove();
    });
    document.querySelectorAll('.forum--links').forEach(linkset => {
	if(linkset.innerText === '') {
		linkset.remove();
	}
    });
}
function initIndex() {
    let topics = document.querySelector('#recent-topics table').outerHTML;
    document.querySelector('#recent-topics').remove();
    document.querySelector('.stats--right .scroll').innerHTML = topics;
}
function initTopicsWrap() {
    $(`.macro--header`).each(function (index) {
        $(this).nextUntil(`.macro--header`).wrapAll(`<div class="topiclist--section" data-type="grid" data-columns="2"></div>`);
    });
    
}
function initTopicDescription(selector) {
    document.querySelectorAll(selector).forEach(desc => {
        desc.innerHTML = desc.innerHTML.replaceAll('[', '<tag-highlight>').replaceAll(']', '</tag-highlight>');
    });
}

/********** Utilities **********/
function fixMc(str) {
    return (""+str).replace(/Mc(.)/g, function(m, m1) {
        return 'Mc' + m1.toUpperCase();
    });
}
function fixMac(str) {
    return (""+str).replace(/Mac(.)/g, function(m, m1) {
        return 'Mac' + m1.toUpperCase();
    });
}
function capitalize(str, separators = [` `, `'`, `-`]) {
    separators = separators || [ ' ' ];
    var regex = new RegExp('(^|[' + separators.join('') + '])(\\w)', 'g');
    let first = str.split(' ')[0].replace(regex, function(x) { return x.toUpperCase(); });
    let last = fixMac(fixMc(str.split(' ').slice(1).join(' ').replace(regex, function(x) { return x.toUpperCase(); })));
    return `${first} ${last}`;
}
function capitalizeMultiple(selector) {
    document.querySelectorAll(selector).forEach(character => {
        character.innerText = capitalize(character.innerText);
    });
}
function cpShift() {
	let imageType = document.querySelector(toggleFields[1]).value,
	    account = document.querySelector(toggleFields[0]).value,
        species = document.querySelector(toggleFields[2]).value,
	    showFields = [],
	    hideFields = characterFields
                    .concat(defaultImages)
                    .concat(gridImages)
                    .concat(mosaicImages),
	    showHeaders = allHeaders;

	if(account == 'character') {
        if(imageType === 'grid') {
            showFields = characterFields
                        .concat(defaultImages)
                        .concat(gridImages);
            hideFields = mosaicImages;
            showHeaders = allHeaders
                        .concat(charHeaders);
            document.querySelector(defaultImages[0]).classList.remove('fullWidth');
        } else if (imageType === 'mosaic') {
            showFields = characterFields
                        .concat(defaultImages)
                        .concat(gridImages)
                        .concat(mosaicImages);
            hideFields = [];
            showHeaders = allHeaders
                        .concat(charHeaders);
            document.querySelector(defaultImages[0]).classList.remove('fullWidth');
        } else {
            showFields = characterFields
                        .concat(defaultImages);
            hideFields = gridImages
                        .concat(mosaicImages);
            showHeaders = allHeaders
                        .concat(charHeaders);
            document.querySelector(defaultImages[0]).classList.add('fullWidth');
        }

        specialSpecies.forEach(special => {
            if (special.species === species) {
                showFields = showFields.concat(special.fields);
            } else {
                hideFields = hideFields.concat(special.fields);
            }
        });
    } else {
        specialSpecies.forEach(special => {
            hideFields = hideFields.concat(special.fields);
        });
    }
    
    adjustCP(showFields, hideFields, showHeaders);
}
function adjustCP(show, hide, headers) {
	show.forEach(field => {
		showAccField(field);
	});
	hide.forEach(field => {
		hideAccField(field);
	});
	document.querySelectorAll('.ucp--header').forEach(header => {
		header.remove();
	});
	headers.forEach(header => {
		insertCPHeader(header['title'], header['insertBefore']);
	});
}
function hideAccField(field) {
	if(document.querySelector(field)) {
		document.querySelector(field).classList.add('hide');
	}
}
function showAccField(field) {
	if(document.querySelector(field)) {
		document.querySelector(field).classList.remove('hide');
	}
}
function insertCPHeader (title, field) {
	$(field).before(`<tr class="pformstrip ucp--header"><td>${title}</td></tr>`);
}
function moveLeft(e) {
    e.parentNode.querySelector('tag-labelset').scrollLeft -= 150;
}
function moveRight(e) {
    e.parentNode.querySelector('tag-labelset').scrollLeft += 150;
}
function setMonth(month) {
    switch(month) {
        case 'January':
            month = 1;
            break;
        case 'February':
            month = 2;
            break;
        case 'March':
            month = 3;
            break;
        case 'April':
            month = 4;
            break;
        case 'May':
            month = 5;
            break;
        case 'June':
            month = 6;
            break;
        case 'July':
            month = 7;
            break;
        case 'August':
            month = 8;
            break;
        case 'September':
            month = 9;
            break;
        case 'October':
            month = 10;
            break;
        case 'November':
            month = 11;
            break;
        case 'December':
            month = 12;
            break;
        default:
            month = -1;
            break;
    }

    return month;
}
function sliderLeft(e) {
    let bullets = e.parentNode.parentNode.querySelectorAll('.post--slider-bullets button');
    let slides = e.parentNode.parentNode.querySelectorAll('.post--slider-slide');
    let image = e.parentNode.parentNode.querySelector('.post--slider > img');
    let index;
    bullets.forEach((bullet, i) => {
        if(bullet.classList.contains('is-active')) {
            index = i;
        }
    });
    
    //remove all active
    bullets.forEach(bullet => bullet.classList.remove('is-active'));
    slides.forEach(slide => slide.classList.remove('is-active'));

    //determine new index
    if(index === 0) {
        index = bullets.length - 1;
    } else {
        index--;
    }

    //add active as needed
    bullets[index].classList.add('is-active');
    slides[index].classList.add('is-active');

    //move slides
    slides.forEach(slide => {
        slide.style.left = `${index * -100}%`;
    });

    //handle image
    if(index !== 0) {
        image.classList.add('blur');
    } else {
        image.classList.remove('blur');
    }
}
function sliderRight(e) {
    let bullets = e.parentNode.parentNode.querySelectorAll('.post--slider-bullets button');
    let slides = e.parentNode.parentNode.querySelectorAll('.post--slider-slide');
    let image = e.parentNode.parentNode.querySelector('.post--slider > img');
    let index;
    bullets.forEach((bullet, i) => {
        if(bullet.classList.contains('is-active')) {
            index = i;
        }
    });
    
    //remove all active
    bullets.forEach(bullet => bullet.classList.remove('is-active'));
    slides.forEach(slide => slide.classList.remove('is-active'));

    //determine new index
    if(index === bullets.length - 1) {
        index = 0;
    } else {
        index++;
    }

    //add active as needed
    bullets[index].classList.add('is-active');
    slides[index].classList.add('is-active');

    //move slides
    slides.forEach(slide => {
        slide.style.left = `${index * -100}%`;
    });

    //handle image
    if(index !== 0) {
        image.classList.add('blur');
    } else {
        image.classList.remove('blur');
    }
}
function sliderBullet(e) {
    let bullets = e.parentNode.parentNode.parentNode.querySelectorAll('.post--slider-bullets button');
    let slides = e.parentNode.parentNode.parentNode.querySelectorAll('.post--slider-slide');
    let image = e.parentNode.parentNode.parentNode.querySelector('.post--slider > img');
    let bulletsArray = Array.from(bullets);
    let index = bulletsArray.indexOf.call(bulletsArray, e);
    
    //remove all active
    bullets.forEach(bullet => bullet.classList.remove('is-active'));
    slides.forEach(slide => slide.classList.remove('is-active'));

    //add active as needed
    bullets[index].classList.add('is-active');
    slides[index].classList.add('is-active');

    //move slides
    slides.forEach(slide => {
        slide.style.left = `${index * -100}%`;
    });

    //handle image
    if(index !== 0) {
        image.classList.add('blur');
    } else {
        image.classList.remove('blur');
    }
}
function initCopyLink() {
    let clippedURL = new Clipboard('.post--permalink');
    document.querySelectorAll('.post--permalink').forEach(link => {
        link.addEventListener('click', e => {
            e.currentTarget.querySelector('.note').style.opacity = 1;
            setTimeout(() => {
                document.querySelectorAll('.note').forEach(note => note.style.opacity = 0);
            }, 3000);
        });
    });
}

/********** Toggles **********/
function toggleNav(e) {
    const button = e;
    const userButton = document.querySelector('.btn--user');
    const main = document.querySelector('.nav--main');
    const menu = document.querySelector('.nav--menu');
    const user = document.querySelector('.nav--user');

    if(button.classList.contains('is-open')) {
        button.classList.remove('is-open');
        main.dataset.open = 'none';
        main.classList.remove('is-open');
        menu.classList.remove('is-open');
    } else {
        button.classList.add('is-open');
        main.dataset.open = 'menu';
        main.classList.add('is-open');
        menu.classList.add('is-open');
        user.classList.remove('is-open');
        userButton.classList.remove('is-open');
    }
}
function toggleUser(e) {
    const button = e;
    const menuButton = document.querySelector('.btn--menu');
    const main = document.querySelector('.nav--main');
    const menu = document.querySelector('.nav--menu');
    const user = document.querySelector('.nav--user');

    if(button.classList.contains('is-open')) {
        button.classList.remove('is-open');
        main.dataset.open = 'none';
        main.classList.remove('is-open');
        user.classList.remove('is-open');
    } else {
        button.classList.add('is-open');
        main.dataset.open = 'menu';
        main.classList.add('is-open');
        user.classList.add('is-open');
        menu.classList.remove('is-open');
        menuButton.classList.remove('is-open');
    }
}
function toggleTheme() {
    if(localStorage.getItem('theme') === 'dark') {
        localStorage.setItem('theme', 'light');
        setTheme();
    } else {
        localStorage.setItem('theme', 'dark');
        setTheme();
    }
}
function toggleSize() {
    if(localStorage.getItem('size') === 'small') {
        localStorage.setItem('size', 'large');
        setSize();
    } else {
        localStorage.setItem('size', 'small');
        setSize();
    }
}
function toggleAvatar(e) {
    e.parentNode.classList.toggle('is-active');
}