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