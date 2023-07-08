let socialArrows = `<button data-direction="left" onclick="slideshowLeft(this)"><i class="fa-solid fa-angle-left"></i></button><button data-direction="right" onclick="slideshowRight(this)"><i class="fa-solid fa-angle-right"></i></button>`;
document.querySelectorAll('tag-socialimages').forEach(imageSet => {
    let images = imageSet.querySelectorAll('img');
    if(images.length > 1) {
        imageSet.insertAdjacentHTML('afterend', socialArrows);
    }
});

document.querySelectorAll('tag-scroll').forEach(temp => {
    if (temp.scrollHeight > temp.clientHeight) {
        temp.classList.add('scroll');
    }
});
initTemplateTabs();


function slideshowLeft(e) {
    let currentPosition = 0;
    let images = e.parentNode.querySelectorAll('tag-socialimages img');
    if(parseInt(e.parentNode.querySelector('tag-socialimages img').style.left)) {
        currentPosition = parseInt(e.parentNode.querySelector('tag-socialimages img').style.left) / -100;
    }
    if(currentPosition === 0) {
        currentPosition = images.length - 1;
    } else {
        currentPosition--;
    }
    images.forEach(image => {
        image.style.left = `${-100 * currentPosition}%`;
    });
}
function slideshowRight(e) {
    let currentPosition = 0;
    let images = e.parentNode.querySelectorAll('tag-socialimages img');
    if(parseInt(e.parentNode.querySelector('tag-socialimages img').style.left)) {
        currentPosition = parseInt(e.parentNode.querySelector('tag-socialimages img').style.left) / -100;
    }
    if(currentPosition === images.length - 1) {
        currentPosition = 0;
    } else {
        currentPosition++;
    }
    images.forEach(image => {
        image.style.left = `${-100 * currentPosition}%`;
    });
}
function tabLeft(e) {
    e.parentNode.querySelector('tag-labelset').scrollLeft -= 150;
}
function tabRight(e) {
    e.parentNode.querySelector('tag-labelset').scrollLeft += 150;
}
function initTemplateTabs() {
    if(document.querySelectorAll('tag-wrap tag-labels').length > 0) {
        document.querySelectorAll('tag-wrap tag-labels').forEach(tabset => {
            let labels = tabset.querySelectorAll('tag-label');
            let tabs = tabset.parentNode.querySelectorAll('tag-tab');

            labels[0].classList.add('is-active');
            tabs[0].classList.add('is-active');
            
            labels.forEach((label, i) => {
                label.addEventListener('click', () => {
                    labels.forEach(label => label.classList.remove('is-active'));
                    tabs.forEach(tab => {
                        tab.classList.remove('is-active');
                        tab.style.left = `${-100 * i}%`;
                    });
                    labels[i].classList.add('is-active');
                    tabs[i].classList.add('is-active');
                })
            });
        });
    }
}