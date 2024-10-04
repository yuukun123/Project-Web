// Select hamburger and mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// Toggle active state on click
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active'); // Toggle hamburger 'X' animation
    mobileMenu.classList.toggle('active'); // Slide in/out the menu
});

/*login*/

/*admin data*/
document.addEventListener('DOMContentLoaded', function() {
    const adminEmail = 'admin@gmail.com'; // Admin email
    const adminName = 'Admin'; // Admin name

    // Get stored users from localStorage
    function getStoredUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    // Check if the admin is logged in and update button text
    function updateLoginButton() {
        const loginButton = document.getElementById('login-btn');

        const users = getStoredUsers();
        const adminUser = users.find(user => user.email === adminEmail); // Check if admin exists

        if (adminUser) {
            loginButton.textContent = adminName; // Change button to admin's name
            loginButton.disabled = true; // Optionally, disable the button after login
        }
    }

    const logoutButton = document.getElementById('logout-btn');

    // Handle the logout functionality
    logoutButton.addEventListener('click', function() {
        // Optionally, clear user data from localStorage or sessionStorage
        localStorage.removeItem('currentUser'); // Example: remove the logged-in user from localStorage

        // Redirect to home page (you can modify the URL as needed)
        window.location.href = '../Home/index.html'; // Redirect to the home page
    });

    // Automatically set admin name on page load if already logged in
    updateLoginButton();
});


/*scroll*/
let lastScrollTop = 0;
const header = document.querySelector('.header');
const mediaQuery = window.matchMedia('(max-width: 1390px)');

function handleScroll() {
    if (mediaQuery.matches) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.classList.add('hide');
        } else {
            // Scrolling up
            header.classList.remove('hide');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    } else {
        // If not in responsive mode, always show the header
        header.classList.remove('hide');
    }
}

// Listen for scroll events
window.addEventListener('scroll', handleScroll);

// Listen for resize events to handle orientation changes
window.addEventListener('resize', handleScroll);

// Initial call to set the correct state
handleScroll();

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


$(document).ready(function(){
    $('.carousel_wrapper').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        prevArrow: $('.custom-prev'),
        nextArrow: $('.custom-next'),
        dotsClass: 'carousel-dots',
        responsive: [
            {
                breakpoint: 1197,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
});

document.querySelector('.like').addEventListener('click', function() {
    this.classList.toggle('active');
});