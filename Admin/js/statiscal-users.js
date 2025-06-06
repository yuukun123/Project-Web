function toggleMenu(hamburger) {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
    
    // Toggle active class for both hamburger icons
    document.querySelectorAll('.hamburger').forEach(icon => {
        icon.classList.toggle('active');
    });
}

/*login*/

/*admin data*/
document.addEventListener('DOMContentLoaded', function() {
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
        localStorage.removeItem('currentUser'); // Example: remove the logged-in user from localStorage

        // Redirect to home page (you can modify the URL as needed)
        window.location.href = '../index.html'; // Redirect to the home page
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
    var chevron = document.querySelectorAll(('#' + chevronId));
    var content = document.querySelectorAll(('#' + contentId));


    chevron.forEach((btn) => {
        btn.classList.toggle('up');
        btn.classList.toggle('down');
    })

    content.forEach((btn) => {
        // Toggle visibility of content
        if (btn.style.display === "none") {
            btn.style.display = "block";

            console.log("11");
        } else {
            btn.style.display = "none";

            console.log("12");
        }
    })
}



const receiptBtns =  document.querySelectorAll('.js-function-detail')
const Receipt = document.querySelector('.div-receipt')
const closebtn = document.querySelector('.close-btn')
for(const receiptBtn of receiptBtns){
    receiptBtn.addEventListener('click',function(){
       
        Receipt.classList.add('open')
    })
}
closebtn.addEventListener('click',function(){
    
    Receipt.classList.remove('open')
})
