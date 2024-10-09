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

// function toggleGrade(gradeId) {
//     const gradeElement = document.getElementById(gradeId);
//     const chevronElement = document.getElementById(`chevron${gradeId.slice(-2)}`);
    
//     gradeElement.classList.toggle('active');
//     chevronElement.classList.toggle('up');
//     chevronElement.classList.toggle('down');
// }

function toggleGrade(contentId, chevronId) {
    var chevron = $('#' + chevronId);
    
    // Immediately toggle chevron rotation
    chevron.toggleClass('down up');
    
    // Slide toggle the content in parallel
    $('#' + contentId).stop().slideToggle(400);
}