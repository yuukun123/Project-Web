const deleteImg = document.querySelector(".deleteimg")
deleteImg.addEventListener('click',function(){
    alert("Delete image successfully !")
})
// Select hamburger and mobile menu
function toggleMenu(hamburger) {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
    
    // Toggle active class for both hamburger icons
    document.querySelectorAll('.hamburger').forEach(icon => {
        icon.classList.toggle('active');
    });
}

/*admin data*/
document.addEventListener('DOMContentLoaded', function() {
    function getCurrentUser() {
        const admins = localStorage.getItem('AdminUser');
        return admins ? JSON.parse(admins) : [];
    }
    

    if (localStorage.getItem("loggedAd") === "true") {
        const currentUser = getCurrentUser(); // Default to "User" if no username found
        const notificate = document.getElementById("notificate");
        const message = document.getElementById("message");
    
        // Display personalized messages
        message.innerHTML = `Welcome back, ${currentUser.username}!<br>Have a good day!`;
        notificate.classList.add("show");

    // Remove the notification after 3 seconds
    setTimeout(() => {
        notificate.classList.remove("show");
        notificate.classList.add("hide"); // Add 'hide' to slide out

        // Optional: Remove the element from the DOM after animation
        setTimeout(() => {
            notificate.style.display = "none";
        }, 2000); // Match the CSS transition duration
    }, 3000);
    
        // Clear the login flag and username
        localStorage.removeItem("loggedAd");
        localStorage.removeItem("username");
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



function showEditNotification() {
    document.getElementById('editNotification').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function hideNotification(notificationId) {
    document.getElementById(notificationId).style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function confirmDelete() {
    alert('Product has been deleted!');
    hideNotification('deleteNotification');
}

function showDeleteNotification() {
    document.getElementById('deleteNotification').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

