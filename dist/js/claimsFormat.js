function structureSpecies(species) {
    let speciesFormatted = species.Species.replace(' ', '').toLowerCase().trim();
    let abilities = species.Strengths.split('+').map(item => `<li>${item}</li>`).join('');
    let weaknesses = species.Weaknesses.split('+').map(item => `<li>${item}</li>`).join('');
    let traits = species.Traits.split('+').map(item => JSON.parse(item)).map(trait => {
        return `<div class="trait">
        <b>${trait.trait}</b>
        <div class="trait--bar"><span style="width: ${trait.percent}%;"></span></div>
    </div>`;
    }).join('');
    let creditsArray = species.Credit.split('+')
                  .map(item => `<a href="?showuser=${JSON.parse(item).userid}">${JSON.parse(item).username}</a>`);
    let credits = ``;
    if(creditsArray.length > 1) {
        creditsArray.forEach((credit, i) => {
            if(i === 0) {
                credits += `${credit}`;
            } else if(creditsArray.length - 1 === i) {
                credits += ` & ${credit}`;
            } else {
                credits += `, ${credit}`;
            }
        });
    } else {
        credits = creditsArray[0];
    }
    let speciesTag = ``;
    if(species.Premium) {
        console.log(`${speciesFormatted} - add premium`);
    } else {
        console.log(`${speciesFormatted} - add regular`);
    }
    let infoBlock = `<div class="species--overview">${speciesTag};
        <h2>${species.Species}</h2>
        <div class="species--facts">
            <div class="species--fact">
                <b>Credit to</b>
                <span>${credits}</span>
            </div>
            <div class="species--fact">
                <b>Lifespan</b>
                <span>${species.Lifespan}</span>
            </div>
            <div class="species--fact">
                <b>Aging</b>
                <span>${species.Aging}</span>
            </div>
        </div>
        <div class="scroll">
            <h3 class="h5">Physiology</h3>
            <p>${species.Physiology}</p>
            <h3 class="h5">Community Structure</h3>
            <p>${species.CommunityStructure}</p>
        </div>
    </div>
    <div class="species--abilities">
        <h3 class="h5">Abilities</h3>
        <div class="scroll">
            <ul>
                ${abilities}
            </ul>
        </div>
    </div>
    <div class="species--weaknesses">
        <h3 class="h5">Weaknesses</h3>
        <div class="scroll">
            <ul>
                ${weaknesses}
            </ul>
        </div>
    </div>
    <div class="species--traits">
        ${traits}
    </div>`;


    let label = `<a href="#${speciesFormatted}">${species.Species.toLowerCase()}</a>`;
    let tab = `<tag-tab data-key="#${speciesFormatted}" class="species">
            ${infoBlock}
    </tag-tab>`;

    document.querySelector('tag-tab[data-category="guides"] tag-labelset').insertAdjacentHTML('beforeend', label);
    document.querySelector('tag-tab[data-category="guides"] tag-tabset').insertAdjacentHTML('beforeend', tab);
}
function structureClaim(title, lines, group = null) {
    let classes = `claims--item`;
    if(group) {
        classes += ` g-${group}`;
    }
    let html = `<div class="${classes}">
        ${title}
        ${lines.map(line => `<span>${line}</span>`).join('')}
    </div>`;

    return html;
}
function structureHeader(title) {
    return `<h2 class="fullWidth h4" data-align="center">${title}</h2>`;
}
function structureAccordionStart(name, id, pronouns, group, groupID) {
    return `<div class="accordion--block g-${groupID}">
    <div class="accordion--title">
        <span>${name}</span>
        <span class="smaller">${group}</span>
        <span class="smaller">${pronouns}</span>
        <a href="?showuser=${id}" class="smaller">View Account</a>
        <span class="smaller accordion--toggle" onClick="toggleAccordion(this)">
            <span class="view-content">View Characters</span>
            <span class="hide-content">Hide Characters</span>
        </span>
    </div>
    <div class="accordion--content sortable-wrap" data-type="grid" data-columns="4">
        <div class="accordion--sorts fullWidth">
            <button onClick="sortButton(this)" data-sort-type="name">Sort by Name</button>
            <button onClick="sortButton(this)" data-sort-type="group">Sort by Group</button>
        </div>`;
}
function structureAccordionItem(name, id, group, groupID) {
    let html = `<a class="g-${groupID} sortable" href="?showuser=${id}">
        <b data-sort-type="name">${name}</b>
        <span data-sort-type="group">${group}</span>
    </a>`;

    return html;
}
function structureAccordionEnd() {
    return `</div></div>`;
}
function toggleAccordion(e) {
    e.classList.toggle('is-open');
    e.closest('.accordion--block').querySelector('.accordion--content').classList.toggle('is-open');
}
function sortButton(button) {
    let item = button.dataset.sortType;
    let switching = true;
    let rows;
    let switchCount = 0;

    while (switching) {
        switching = false;
        rows = button.closest('.sortable-wrap').querySelectorAll(`.sortable`);
        console.log(rows);
        for (i = 0; i < rows.length; i++) {
          shouldSwitch = false;

          //set sorting value in a way that works for date, numerical, or alphabetical sorting
          switch(button.dataset.sortBy) {
            case 'date':
                a = Date.parse(rows[i].querySelector(`[data-sort-type="${item}"]`).innerText.toLowerCase().trim());
                b = Date.parse(rows[i + 1].querySelector(`[data-sort-type="${item}"]`).innerText.toLowerCase().trim());
                break;
            case 'number':
                a = parseInt(rows[i].querySelector(`[data-sort-type="${item}"]`).innerText.toLowerCase().trim());
                b = parseInt(rows[i + 1].querySelector(`[data-sort-type="${item}"]`).innerText.toLowerCase().trim());
                break;
            default:
                a = rows[i].querySelector(`[data-sort-type="${item}"]`).innerText.toLowerCase().trim();
                b = rows[i + 1].querySelector(`[data-sort-type="${item}"]`).innerText.toLowerCase().trim();
          }
          
          if (a > b) {
            shouldSwitch = true;
            break;
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          switchCount ++;
        }
    }
    switching = true;
    switchCount = 0;
}