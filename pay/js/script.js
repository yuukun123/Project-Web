// Select hamburger and mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// Toggle active state on click
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active'); // Toggle hamburger 'X' animation
    mobileMenu.classList.toggle('active'); // Slide in/out the menu
});

/*login*/
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelectorAll('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.forEach(btn => {
    btn.addEventListener('click', () => {
        wrapper.classList.add('active-popup');

    })
})

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

/*admin data*/
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginBox = document.querySelector('.login');
    const registerBox = document.querySelector('.register');

    // Switch to Register Form
    document.querySelector('.register-link').addEventListener('click', function() {
        loginBox.style.display = 'none';
        registerBox.style.display = 'block';
    });

    // Switch to Login Form
    document.querySelector('.login-link').addEventListener('click', function() {
        loginBox.style.display = 'block';
        registerBox.style.display = 'none';
    });

    // Get stored users from localStorage
    function getStoredUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    // Save users to localStorage
    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Initialize admin and client users
    function initializeUsers() {
        let users = getStoredUsers();

        // Check if admin and client users already exist, if not add them
        if (!users.find(user => user.email === 'admin@gmail.com')) {
            users.push({ username: 'Admin', email: 'admin@gmail.com', password: 'admin123' });
        }

        if (!users.find(user => user.email === 'client@gmail.com')) {
            users.push({ username: 'Client', email: 'client@gmail.com', password: 'client123' });
        }

        saveUsers(users); // Save the updated users list to localStorage
    }

    // Call this function to ensure admin and client are in the users list
    initializeUsers();

    // Handle Login Form Submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const users = getStoredUsers();
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert('Login successful!');
            // Check if the email is admin or client and redirect accordingly
            if (email === 'admin@gmail.com') {
                window.location.href = '../Admin/index.html'; // Redirect to admin page
            } else if (email === 'client@gmail.com') {
                window.location.href = '../Client/index.html'; // Redirect to client page
            } else {
                alert('Unknown user role.');
            }
        } else {
            alert('Invalid email or password!');
        }
    });

    // Handle Register Form Submission
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        const users = getStoredUsers();

        // Check if email is already registered
        if (users.find(user => user.email === email)) {
            alert('Email is already registered!');
        } else {
            users.push({ username, email, password });
            saveUsers(users);
            alert('Registration successful!');
            loginBox.style.display = 'block';
            registerBox.style.display = 'none';
        }
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


function showConfirmation() {
    document.querySelector('.my-order').style.display = 'none';
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('confirmation').style.display = 'block';
}

// back to top scrolling
window.onscroll = function () {
    toggleBackToTopButton();
};

function toggleBackToTopButton() {
    const backToTopButton = document.getElementById("backToTop");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}