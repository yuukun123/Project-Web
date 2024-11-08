// Select hamburger and mobile menu
// const hamburger = document.getElementById('hamburger');
// const mobileMenu = document.getElementById('mobileMenu');

// // Toggle active state on click
// hamburger.addEventListener('click', () => {
//     hamburger.classList.toggle('active'); // Toggle hamburger 'X' animation
//     mobileMenu.classList.toggle('active'); // Slide in/out the menu
// });

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
        window.location.replace('../../../Admin/loginAdmin/login.html'); // Redirect to the home page
    });

    // Automatically set admin name on page load if already logged in
    updateLoginButton();

    // const save = document.querySelector('.save');
    // const cancel = document.querySelector('.cancel');
    // const save_suc = document.querySelector('.save-success');
    // const cancel_suc = document.querySelector('.cancel-success');
    // const blurOverlay = document.querySelector('.blur-overlay');
    // const close = document.querySelector('.close');
    // const close2 = document.querySelectorAll('.close2');

    // save.addEventListener('click', function() {
    //     save_suc.classList.add('active-popup');
    //     blurOverlay.classList.add('active');
    // })

    // close.addEventListener('click', function() {
    //     save_suc.classList.remove('active-popup');
    //     blurOverlay.classList.remove('active');
    // })

    // cancel.addEventListener('click', function() {
    //     cancel_suc.classList.add('active-popup');
    //     blurOverlay.classList.add('active');
    // });


    // close2.forEach(btn => {
    //     btn.addEventListener('click', () => {
    //         cancel_suc.classList.remove('active-popup');
    //         blurOverlay.classList.remove('active');
    //     });
    // });
});

function toggleGrade(contentId, chevronId) {
    var chevron = $('#' + chevronId);
    
    // Immediately toggle chevron rotation
    chevron.toggleClass('down up');
    
    // Slide toggle the content in parallel
    $('#' + contentId).stop().slideToggle(400);
}




let userIdCounter = 4321; // Starting ID

// Function to show the add user modal
function showAddUserForm() {
    document.getElementById("modalTitle").innerText = "Add User";
    document.getElementById("userModal").style.display = "flex";
  clearFormFields(); // Clear the input fields when adding a new user
}

// Function to show the edit user modal with pre-filled data
function showEditUserForm(userId) {
document.getElementById("modalTitle").innerText = "Edit User";
document
    .getElementById("userModal")
    .setAttribute("data-edit-id", userId);

  // Get the user data from the row
    const row = document.getElementById(userId);
    document.getElementById("username").value = row.cells[1].innerText;
    document.getElementById("email").value = row.cells[2].innerText;
    document.getElementById("firstName").value = row.cells[3].innerText;
    document.getElementById("lastName").value = row.cells[4].innerText;

    document.getElementById("userModal").style.display = "flex";
}

// Function to save user data
function saveUser() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    const modalTitle = document.getElementById("modalTitle").innerText;
    const isEdit = modalTitle === "Edit User";

    let users = JSON.parse(localStorage.getItem("userList")) || [];

    if (isEdit) {
    // Handle edit user logic
    const userId = document
        .getElementById("userModal")
        .getAttribute("data-edit-id");
    const row = document.getElementById(userId);
    row.cells[1].innerText = username;
    row.cells[2].innerText = email;
    row.cells[3].innerText = firstName;
    row.cells[4].innerText = lastName;

    // Update the user data in localStorage
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex > -1) {
        users[userIndex] = {
        id: userId,
        username,
        email,
        firstName,
        lastName,
        };
    }
    } else {
    // Handle add new user logic
    userIdCounter++; // Increment ID for the new user
    const newUserId = `user${userIdCounter}`; // Create a unique ID
    const newUser = {
        id: newUserId,
        username,
        email,
        firstName,
        lastName,
    };

    // Add the new user to localStorage
    users.push(newUser);

    // Render new row in the table
    addUserToTable(newUser);
}

  // Save updated user list to localStorage
    localStorage.setItem("userList", JSON.stringify(users));

    closeModal();
}

// Function to add user to the table with lock button
function addUserToTable(user) {
    const table = document.querySelector("table tbody");
    const newRow = table.insertRow();

newRow.id = user.id;

const cell1 = newRow.insertCell(0);
const cell2 = newRow.insertCell(1);
const cell3 = newRow.insertCell(2);
const cell4 = newRow.insertCell(3);
const cell5 = newRow.insertCell(4);
const cell6 = newRow.insertCell(5);

cell1.innerHTML = String(user.id.replace("user", "")).padStart(8, "0"); // Format ID with leading zeros
cell2.innerHTML = user.username;
cell3.innerHTML = user.email;
cell4.innerHTML = user.firstName;
cell5.innerHTML = user.lastName;

cell6.innerHTML = `
    <button class="button edit" onclick="showEditUserForm('${user.id}')">Edit</button>
    <button class="button delete" onclick="deleteUser('${user.id}')">Delete</button>
    <button class="button lock" onclick="toggleLock('${user.id}')">
    <ion-icon name="lock-closed-outline"></ion-icon>
</button>
`;
}

// Function to toggle lock/unlock status
function toggleLock(userId) {
    const row = document.getElementById(userId);
    const lockButton = row.querySelector(".lock ion-icon");
    const isLocked =
    lockButton.getAttribute("name") === "lock-closed-outline";

    if (isLocked) {
    lockButton.setAttribute("name", "lock-open-outline");
    } else {
    lockButton.setAttribute("name", "lock-closed-outline");
    }
}

// Function to delete a user
function deleteUser(userId) {
    document.getElementById(userId).remove();

    let users = JSON.parse(localStorage.getItem("userList")) || [];
    users = users.filter((user) => user.id !== userId);
    localStorage.setItem("userList", JSON.stringify(users));
}

// Function to close the modal
function closeModal() {
    document.getElementById("userModal").style.display = "none";
}

// Function to clear the input fields
function clearFormFields() {
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
}