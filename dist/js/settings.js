const colors = {
    'amaranth': 'b56f6f',
    'birch': 'cdb19c',
    'blueberry': '588497',
    'dandelion': 'ae9463',
    'hemlock': '58929c',
    'juniper': '70769f',
    'lupin': 'ac8fb0',
    'nettle': '91b38b',
    'spruce': '77998d',
    'sundew': 'bd8665',
}

const toggleFields = ['#field_1_input', '#field_40_input', '#field_27_input'];

const characterFields = ['#field_13', '#field_14', '#field_15', '#field_16', '#field_17', '#field_18', '#field_19', '#field_20', '#field_21', '#field_22', '#field_23', '#field_24', '#field_25', '#field_26', '#field_27', '#field_29', '#field_30', '#field_31', '#field_32', '#field_33', '#field_34', '#field_35', '#field_36', '#field_37', '#field_38', '#field_39'];

const hybridFields = ['#field_28'];
const wereFields = ['#field_58'];
const dragonFields = ['#field_59'];

const allHeaders = [
    {'title': `Player Information`, 'insertBefore': '#field_1'},
    {'title': `Images`, 'insertBefore': '#field_40'},
];
const charHeaders = [
    {'title': `Basic Information`, 'insertBefore': '#field_13'},
    {'title': `Detailed Information`, 'insertBefore': '#field_29'},
    {'title': `Plotting`, 'insertBefore': '#field_32'},
    {'title': `Links`, 'insertBefore': '#field_36'},
];

const specialSpecies = [
    {'species': 'hybrid', 'fields': hybridFields},
    {'species': 'were', 'fields': wereFields},
    {'species': 'dragon', 'fields': dragonFields},
];

