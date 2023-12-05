function speciesBlock(species) {
    //abilities and weaknesses
    let abilities = species.Strengths.split('@').map(item => `<li>${item}</li>`).join('');
    let weaknesses = species.Weaknesses.split('@').map(item => `<li>${item}</li>`).join('');

    //traits
    let traits = species.Traits.split('+').map(item => JSON.parse(item)).map(trait => {
        return `<div class="trait">
        <b>${trait.trait}</b>
        <div class="trait--bar"><span style="width: ${trait.percent}%;"></span></div>
    </div>`;
    }).join('');

    //credits
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

    //premium
    let speciesTag = ``;
    if(species.Premium === 'TRUE') {
        speciesTag = `<div class="species--tag"><a href="?act=store&code=shop&category=11" title="Visit the shop to purchase a premium species"><span class="notMobile">Premium Species</span><span class="onlyMobile"><i class="fa-solid fa-star"></i></span></a></div>`;
    }

    return `<div class="species--item ${species.Tags}">${speciesTag !== `` ? speciesTag : ''}
        <div class="species--body">
            <h3 class="species--title">${species.Species}</h3>
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
            <button class="species--learn-more" onclick="openSpecies(this);">
                <span class="to-open">Learn More</span>
                <span class="to-close">Close Info Panel</span>
            </button>
            <div class="openOnly">
                <div class="species--skills">
                    ${traits}
                </div>
                <div class="species--long">
                    <h4 class="h5">Physiology</h4>
                    <div class="species--content-block"><span class="scroll">${species.Physiology}</span></div>
                </div>
                <div class="species--long">
                    <h4 class="h5">Community Structure</h4>
                    <div class="species--content-block"><span class="scroll">${species.CommunityStructure}</span></div>
                </div>
                <div class="species--abilities">
                    <div class="species--short">
                        <h4 class="h5">Abilities</h4>
                        <div class="species--content-block"><span class="scroll"><ul>${abilities}</ul></span></div>
                    </div>
                    <div class="species--short">
                        <h4 class="h5">Weaknesses</h4>
                        <div class="species--content-block"><span class="scroll"><ul>${weaknesses}</ul></span></div>
                    </div>
                </div>
                <button class="species--learn-more closeOnly" onclick="closeSpecies(this);">Close Info Panel</button>
            </div>
        </div>
    </div>`;
}

function formatSpecies(data) {
    let html = ``;

    data.forEach(species => {
        html += speciesBlock(species);
    });

    document.querySelector('#species--rows').insertAdjacentHTML('beforeend', html);
}

function openSpecies(e) {
    e.closest('.species--item').classList.toggle('is-open');
    e.closest('.species--item').classList.toggle('grid-item--width2');
    $('#species--rows').isotope('layout');
}

function closeSpecies(e) {
    e.closest('.species--item').classList.remove('is-open');
    e.closest('.species--item').classList.remove('grid-item--width2');
    $('#species--rows').isotope('layout');
}

function initSpecies() {
    //init filter popout
    document.querySelectorAll('.species--filters > button').forEach(toggle => {
        toggle.addEventListener('click', e => {
            e.currentTarget.classList.toggle('is-open');
            e.currentTarget.parentNode.classList.toggle('is-open');
            e.currentTarget.nextElementSibling.classList.toggle('is-open');
        });
    });
    //init filter dropdowns
    document.querySelectorAll('.species--filter > a').forEach(toggle => {
        toggle.addEventListener('click', e => {
            e.currentTarget.classList.toggle('is-open');
        });
    });

    //isotope
    var filters = {};

    //set class variables
    let $container = $('#species--rows');
    let gridItem = `.species--item`;
    let typeSearch = `#quicksearch`;
    let memName = `.species--title`;
    let visible = `is-visible`;
    let filterGroup = `.species--filter-group`;
    let filterOptions = `.species--filter-group input`;

    function setCustomFilter() {
        //get search value
        qsRegex = document.querySelector(typeSearch).value;
        
        //add show class to all items to reset
        elements.forEach(el => el.classList.add(visible));
        
        //filter by nothing
        let searchFilter = '';
        
        //check each item
        elements.forEach(el => {
            let name = el.querySelector(memName).textContent;
            if(!name.toLowerCase().includes(qsRegex)) {
                el.classList.remove(visible);
                searchFilter = `.${visible}`;
            }
        });
    
        let filterGroups = document.querySelectorAll(filterGroup);
        let groups = [];
        filterGroups.forEach(group => {
            let filters = [];
            group.querySelectorAll('label.is-checked input').forEach(filter => {
                if(filter.value) {
                    filters.push(filter.value);
                }
            });
            groups.push({group: group.dataset.filterGroup, selected: filters});
        });
    
        let filterCount = 0;
        let comboFilters = [];
        groups.forEach(group => {
            // skip to next filter group if it doesn't have any values
            if ( group.selected.length > 0 ) {
                if ( filterCount === 0 ) {
                    // copy groups to comboFilters
                    comboFilters = group.selected;
                } else {
                    var filterSelectors = [];
                    var groupCombo = comboFilters;
                    // merge filter Groups
                    for (var k = 0; k < group.selected.length; k++) {
                        for (var j = 0; j < groupCombo.length; j++) {
                            //accommodate weirdness with object vs not
                            if(groupCombo[j].selected) {
                                if(groupCombo[j].selected != group.selected[k]) {
                                    filterSelectors.push( groupCombo[j].selected + group.selected[k] );
                                }
                            } else if (!groupCombo[j].selected && group.selected[k]) {
                                if(groupCombo[j] != group.selected[k]) {
                                    filterSelectors.push( groupCombo[j] + group.selected[k] );
                                }
                            }
                        }
                    }
                    // apply filter selectors to combo filters for next group
                    comboFilters = filterSelectors;
                }
                filterCount++;
            }
        });
        
        //set filter to blank
        let filter = [];
        //check if it's only search
        if(qsRegex.length > 0 && comboFilters.length === 0) {
            filter = [`.${visible}`];
        }
        //check if it's only checkboxes
        else if(qsRegex.length === 0 && comboFilters.length > 0) {
            let combos = comboFilters.join(',').split(',');
            filter = [...combos];
        }
        //check if it's both
        else if (qsRegex.length > 0 && comboFilters.length > 0) {
            let dualFilters = comboFilters.map(filter => filter + `.${visible}`);
            filter = [...dualFilters];
        }
    
        //join array into string
        filter = filter.join(', ');
        
        //render isotope
        $container.isotope({
            filter: filter
        });
    }

    //initialize isotope
    // quick search regex
    let qsRegex;
    let elements = document.querySelectorAll(gridItem);

    if(window.location.hash) {
        document.querySelector(typeSearch).value = window.location.hash.split('#')[1];
        setCustomFilter();
    }

    //use value of input select to filter
    let checkboxes = document.querySelectorAll(filterOptions);
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', e => {
            if(e.currentTarget.classList.contains('all')) {
                e.currentTarget.checked = true;
                e.currentTarget.parentElement.classList.add('is-checked');
                e.currentTarget.parentElement.parentElement.querySelectorAll('input:not(.all)').forEach(input => {
                    input.checked = false;
                    input.parentElement.classList.remove('is-checked');
                });
            } else {
                if(e.currentTarget.parentElement.classList.contains('is-checked')) {
                    e.currentTarget.checked = false;
                    e.currentTarget.parentElement.classList.remove('is-checked');
                } else {
                    e.currentTarget.checked = true;
                    e.currentTarget.parentElement.classList.add('is-checked');
                    e.currentTarget.parentElement.parentElement.querySelector('input.all').checked = false;
                    e.currentTarget.parentElement.parentElement.querySelector('input.all').parentElement.classList.remove('is-checked');
                }
            }
            let labels = e.currentTarget.parentElement.parentElement.querySelectorAll('label');
            let checked = 0;
            labels.forEach(label => {
                if(label.classList.contains('is-checked')) {
                    checked++;
                }
            });
            if(checked === 0) {
                e.currentTarget.parentElement.parentElement.querySelector('input.all').checked = true;
                e.currentTarget.parentElement.parentElement.querySelector('input.all').parentElement.classList.add('is-checked');
            }
            //set filters
            setCustomFilter();
        });
    });
    
    // use value of search field to filter
    document.querySelector(typeSearch).addEventListener('keyup', e => {
        window.location.hash = e.currentTarget.value;
        setCustomFilter();
    });

}