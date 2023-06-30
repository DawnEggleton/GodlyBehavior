function formatSpecies(data) {
    data.sort((a,b) => {
        if(a.Species < b.Species) {
            return -1;
        } else if (a.Species > b.Species) {
            return 1;
        } else {
            return 0;
        }
    });

    data.forEach(item => {
        structureSpecies(item);
    })
}

function formatReserves(data) {
    let current = new Date();
    let active = data.filter(item => {
        let time = new Date(item.Timestamp);
        let difference = Math.floor(((current - time) / (1000*60*60*24)));
        return difference < 15;
    });
    active.sort((a, b) => {
        if (a.Face < b.Face) {
            return -1;
        } else if (a.Face > b.Face) {
            return 1;
        } else {
            return 0;
        }
    });
    let html = `<div class="claims" data-type="grid" data-columns="4">`;
    active.forEach(reserve => {
        let reserveDate = new Date(reserve.Timestamp);
        reserveDate.setDate(reserveDate.getDate() + 14);
        const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october',	'november', 'december'];
        let lines = [
            `Reserved by ${reserve.Member}`,
            `Expires ${months[reserveDate.getMonth()]} ${reserveDate.getDate()}, ${reserveDate.getFullYear()}`
        ];
        html += structureClaim(`<b>${reserve.Face}</b>`, lines);
    });
    if (html === ``) {
        html = `<div class="claim--notice fullWidth">No active reservations.</div>`;
    }
    html += `</div>`;
    document.querySelector(`tag-tab[data-key="#reserves"]`).insertAdjacentHTML('beforeend', html);
}

function formatMembers(data) {
    data.sort((a, b) => {
        if(a.Member < b.Member) {
            return -1;
        } else if (a.Member > b.Member) {
            return 1;
        } else if (a.Character < b.Character) {
            return -1;
        } else if (a.Character > b.Character) {
            return 1;
        } else {
            return 0;
        }
    });
    let html = ``;

    data.forEach((claim, i) => {
        //First
        if(i === 0) {
            html += structureHeader(`<a href="?showuser=${claim.ParentID}">${claim.Member}</a>`);
            html += structureClaim(`<a href="?showuser=${claim.AccountID}">${claim.Character}</a>`, [], claim.GroupID);
        }
        //New Member
        else if(claim.Member !== data[i - 1].Member) {
            html += structureHeader(`<a href="?showuser=${claim.ParentID}">${claim.Member}</a>`);
            html += structureClaim(`<a href="?showuser=${claim.AccountID}">${claim.Character}</a>`, [], claim.GroupID);
        }
        //New Character
        else  {
            html += structureClaim(`<a href="?showuser=${claim.AccountID}">${claim.Character}</a>`, [], claim.GroupID);
        }
    });

    document.querySelector(`tag-tab[data-key="#members"]`).insertAdjacentHTML('beforeend', html);
}

function formatFaces(data) {
    data.sort((a, b) => {
        if(a.Face < b.Face) {
            return -1;
        } else if (a.Face > b.Face) {
            return 1;
        } else if (a.Character < b.Character) {
            return -1;
        } else if (a.Character > b.Character) {
            return 1;
        } else {
            return 0;
        }
    });
    let html = ``;

    data.forEach((claim, i) => {
        //First
        if(i === 0) {
            html += structureHeader(claim.Face[0]);
            html += structureClaim(`<a href="?showuser=${claim.AccountID}">${claim.Face}</a>`, [`Playing ${claim.Character}`], claim.GroupID);
        }
        //New Member
        else if(claim.Face[0] !== data[i - 1].Face[0]) {
            html += structureHeader(claim.Face[0]);
            html += structureClaim(`<a href="?showuser=${claim.AccountID}">${claim.Face}</a>`, [`Playing ${claim.Character}`], claim.GroupID);
        }
        //New Character
        else  {
            html += structureClaim(`<a href="?showuser=${claim.AccountID}">${claim.Face}</a>`, [`Playing ${claim.Character}`], claim.GroupID);
        }
    });

    document.querySelector(`tag-tab[data-key="#faces"]`).insertAdjacentHTML('beforeend', html);
}

function formatJobs(data) {
    let employed = data.filter(item => item.Jobs && item.Jobs !== '');
    let jobs = [];

    employed.forEach(character => {
        let positions = character.Jobs.split('+').map(item => JSON.parse(item));
        positions.forEach(position => {
            position.character = character.Character;
            position.account = character.AccountID;
            position.group = character.GroupID;
            position.bumpOwner = position.position.includes('owner') ? 1 : 0;
            position.bumpLeader = position.position.includes('leader') ? 1 : 0;
            position.bumpManager = position.position.includes('manager') ? 1 : 0;
        });
        jobs = [...jobs, ...positions];
    });

    jobs.sort((a, b) => {
        if(a.employer < b.employer) {
            return -1;
        } else if (a.employer > b.employer) {
            return 1;
        } else if (a.bumpOwner > b.bumpOwner) {
            return -1;
        } else if (a.bumpOwner < b.bumpOwner) {
            return 1;
        } else if (a.bumpLeader > b.bumpLeader) {
            return -1;
        } else if (a.bumpLeader < b.bumpLeader) {
            return 1;
        } else if (a.bumpManager > b.bumpManager) {
            return -1;
        } else if (a.bumpManager < b.bumpManager) {
            return 1;
        } else if (a.position < b.position) {
            return -1;
        } else if (a.position > b.position) {
            return 1;
        } else if (a.character < b.character) {
            return -1;
        } else if (a.character > b.character) {
            return 1;
        } else {
            return 0;
        }
    });
    let html = ``;

    jobs.forEach((claim, i) => {
        //First
        if(i === 0) {
            html += structureHeader(claim.employer);
            html += structureClaim(`<a href="?showuser=${claim.account}">${claim.character}</a>`, [claim.position], claim.group);
        }
        //New Employer
        else if(claim.employer !== jobs[i - 1].employer) {
            html += structureHeader(claim.employer);
            html += structureClaim(`<a href="?showuser=${claim.account}">${claim.character}</a>`, [claim.position], claim.group);
        }
        //New Character
        else  {
            html += structureClaim(`<a href="?showuser=${claim.account}">${claim.character}</a>`, [claim.position], claim.group);
        }
    });

    document.querySelector(`tag-tab[data-key="#jobs"]`).insertAdjacentHTML('beforeend', html);
}