/********** Initializations **********/
function initStickyMenu() {
    const sticky = document.querySelector('.nav--main');
    const initScroll = document.documentElement.scrollTop;
    if (initScroll > 0) {
        sticky.classList.add("is-sticky");
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
    }

    window.addEventListener('scroll', e => {
        const scroll = document.documentElement.scrollTop;
        if (scroll > 0) {
            sticky.classList.add("is-sticky");
        } else {
            sticky.classList.remove("is-sticky")
        }
    });
}

/********** Utilities **********/

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