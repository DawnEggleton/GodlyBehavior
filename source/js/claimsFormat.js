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
    let infoBlock = `<div class="species--overview">
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