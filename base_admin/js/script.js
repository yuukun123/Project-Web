// Select hamburger and mobile menu
// const hamburger = document.getElementById('hamburger');
// const mobileMenu = document.getElementById('mobileMenu');

// // Toggle active state on click
// hamburger.addEventListener('click', () => {
//     hamburger.classList.toggle('active'); // Toggle hamburger 'X' animation
//     mobileMenu.classList.toggle('active'); // Slide in/out the menu
// });

const save = document.querySelector('.save');
const cancel = document.querySelector('.cancel');
const save_suc = document.querySelector('.save-success');
const cancel_suc = document.querySelector('.cancel-success');
const blurOverlay = document.querySelector('.blur-overlay');
const close = document.querySelector('.close');
const close2 = document.querySelectorAll('.close2');

save.addEventListener('click', function(event) {
    event.preventDefault();
    save_suc.classList.add('active-popup');
    blurOverlay.classList.add('active');
})

close.addEventListener('click', function(event) {
    event.stopPropagation();
    save_suc.classList.remove('active-popup');
    blurOverlay.classList.remove('active');
})

cancel.addEventListener('click', function(event) {
    event.preventDefault();
    cancel_suc.classList.add('active-popup');
    blurOverlay.classList.add('active');
});


close2.forEach(btn => {
    btn.addEventListener('click', (event) => {
        event.stopPropagation()
        cancel_suc.classList.remove('active-popup');
        blurOverlay.classList.remove('active');
    });
});

/*admin data*/
document.addEventListener('DOMContentLoaded', function() {

    // Get stored users from localStorage
    function getCurrentUser() {
        const admins = localStorage.getItem('AdminUser');
        return admins ? JSON.parse(admins) : [];
    }

    // Check if the admin is logged in and update button text
    function updateLoginButton() {
        const loginButton = document.getElementById('login-btn');

        const admins = getCurrentUser();

        if (admins) {
            loginButton.textContent = admins.username; // Change button to admin's name
            loginButton.disabled = true; // Optionally, disable the button after login
        }
    }

    const logoutButton = document.getElementById('logout-btn');

    // Handle the logout functionality
    logoutButton.addEventListener('click', function() {
        // Optionally, clear user data from localStorage or sessionStorage
        localStorage.removeItem('AdminUser'); // Example: remove the logged-in user from localStorage

        // Redirect to home page (you can modify the URL as needed)
        window.location.replace('../../loginAdmin/login.html'); // Redirect to the home page
    });

    // Automatically set admin name on page load if already logged in
    updateLoginButton();
});

function toggleGrade(contentId, chevronId) {
    var chevron = $('#' + chevronId);
    
    // Immediately toggle chevron rotation
    chevron.toggleClass('down up');
    
    // Slide toggle the content in parallel
    $('#' + contentId).stop().slideToggle(400);
}