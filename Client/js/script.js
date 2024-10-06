// Select hamburger and mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// Toggle active state on click
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active'); // Toggle hamburger 'X' animation
    mobileMenu.classList.toggle('active'); // Slide in/out the menu
});

/*logout*/
// const loginBtn = document.getElementById('login-btn');
// const logoutContainer = document.getElementById('logout-btn');

// Toggle the visibility of the logout button when clicking login



/*admin data*/
document.addEventListener('DOMContentLoaded', function() {
    const clientEmail = 'client@gmail.com'; // Client email
    const clientName = 'Yuu'; // Client name

    // Select both login buttons (desktop and mobile)
    const loginBtns = document.querySelectorAll('.btnLogin-popup');
    const logoutContainers = document.querySelectorAll('.Function-cl'); // Multiple containers
    const logoutBtns = document.querySelectorAll('.btnLogout-popup'); // Both logout buttons

    // Get stored users from localStorage
    function getStoredUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    // Function to update all login buttons if admin is logged in
    function updateLoginButtons() {
        const users = getStoredUsers();
        const clientUser = users.find(user => user.email === clientEmail); // Check if admin exists

        if (clientUser) {
            loginBtns.forEach(button => {
                button.textContent = clientName; // Change button text to admin's name
                button.classList.add('logged-in'); // Optionally, add a visual indication that the admin is logged in
            });
        }
    }

    // Call updateLoginButtons on page load to update both login buttons
    updateLoginButtons();

    // Toggle the visibility of the logout button when clicking login
    loginBtns.forEach(button => {
        button.addEventListener('click', () => {
            console.log("Login button clicked");
            logoutContainers.forEach(container => {
                container.classList.toggle('active-popup'); // Toggle visibility of the logout container
            });
        });
    });

    // Handle the logout functionality for both logout buttons (mobile and desktop)
    logoutBtns.forEach(button => {
        button.addEventListener('click', function() {
            console.log("Logout button clicked");
            // Clear user data from localStorage or sessionStorage
            localStorage.removeItem('currentUser'); // Example: remove the logged-in user from localStorage

            // Redirect to home page (modify URL if needed)
            window.location.href = '../Home/index.html'; // Redirect to home page
        });
    });
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