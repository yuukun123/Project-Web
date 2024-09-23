const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

/*search*/
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('search');
    const label = document.querySelector('label[for="search"]');

    // Function to check if input is focused or has value
    function toggleLabel() {
        console.log('Input value:', input.value);
        if (input.value.trim() !== "" || document.activeElement === input) {
            console.log('Adding floating class');
            label.classList.add('floating');
        } else {
            console.log('Removing floating class');
            label.classList.remove('floating');
        }
    }


    // Event listeners for focus, blur, and input changes
    input.addEventListener('focus', toggleLabel);
    input.addEventListener('blur', toggleLabel);
    input.addEventListener('input', toggleLabel);
});

/*scroll header*/
const header = document.querySelector('header');
let lastScrollTop = 0;
const scrollFactor = 0.5; // Adjust this value to control the scroll speed (0.5 means half speed)

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDiff = scrollTop - lastScrollTop;

    // Calculate the new position of the header
    const currentTransform = getComputedStyle(header).transform;
    const matrix = new DOMMatrix(currentTransform);
    let newY = matrix.m42 - (scrollDiff * scrollFactor);

    // Limit the header's movement
    newY = Math.max(newY, -header.offsetHeight); // Don't move more than header height
    newY = Math.min(newY, 0); // Don't move below the top of the page

    // Apply the new position
    header.style.transform = `translateY(${newY}px)`;

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);


$(document).ready(function() {
    $('.slick-slider').slick({
        infinite: true, // Enables smooth infinite looping
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 3000, // Adjust this as per your preference
        // speed: 500, // Transition speed
        prevArrow: '<button class="slick-prev custom-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg></button>',
        nextArrow: '<button class="slick-next custom-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg></button>',
        dots: true, // Enable dots for navigation
        adaptiveHeight: false,
        customPaging: function(slider, i) {
            return '<button>' + (i + 1) + '</button>';
        },
        responsive: [{
            breakpoint: 768,
            settings: {
                arrows: false
            }
        }]
    });
});