const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", function () {
  // Get stored users from localStorage
  function getCurrentUser() {
    const admins = localStorage.getItem("AdminUser");
    return admins ? JSON.parse(admins) : [];
  }

  // Check if the admin is logged in and update button text
  function updateLoginButton() {
    const loginButton = document.getElementById("login-btn");

    const admins = getCurrentUser();

    if (admins) {
      loginButton.textContent = admins.username; // Change button to admin's name
      loginButton.disabled = true; // Optionally, disable the button after login
    }
  }

  const logoutButton = document.getElementById("logout-btn");

  // Handle the logout functionality
  logoutButton.addEventListener("click", function () {
    // Optionally, clear user data from localStorage or sessionStorage
    localStorage.removeItem("AdminUser"); // Example: remove the logged-in user from localStorage

    // Redirect to home page (you can modify the URL as needed)
    window.location.replace(
      "../../../../Project_web/Admin/loginAdmin/login.html"
    ); // Redirect to the home page
  });

  // Automatically set admin name on page load if already logged in
  updateLoginButton();
});

function toggleGrade(contentId, chevronId) {
  const chevron = $("#" + chevronId);
  chevron.toggleClass("down up");
  $("#" + contentId)
    .stop()
    .slideToggle(400);
}

function showAddUserForm() {
  document.getElementById("addUserForm").style.display = "block";
  hideEditUserForm();
}

function hideAddUserForm() {
  document.getElementById("addUserForm").style.display = "none";
}

function showEditUserForm(userData) {
  document.getElementById("editUserForm").style.display = "block";
  document.getElementById("edit_username").value = userData.username;
  document.getElementById("edit_email").value = userData.email;
  document.getElementById("edit_first_name").value = userData.first_name;
  document.getElementById("edit_last_name").value = userData.last_name;
}

function hideEditUserForm() {
  document.getElementById("editUserForm").style.display = "none";
}

document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const password = document.getElementById("password").value;

    const users = getStoredUsers();
    users.push({
      username,
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      isLocked: false,
    });
    localStorage.setItem("users", JSON.stringify(users));

    showUserList();
    hideAddUserForm();
  });

document
  .getElementById("editUserFormContent")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const editUsername = document.getElementById("edit_username").value;
    const editEmail = document.getElementById("edit_email").value;
    const editFirstName = document.getElementById("edit_first_name").value;
    const editLastName = document.getElementById("edit_last_name").value;

    const users = getStoredUsers();
    const userIndex = users.findIndex((user) => user.email === editEmail);

    if (userIndex !== -1) {
      users[userIndex].username = editUsername;
      users[userIndex].first_name = editFirstName;
      users[userIndex].last_name = editLastName;

      localStorage.setItem("users", JSON.stringify(users));
      showUserList();
      hideEditUserForm();
    } else {
      alert("User not found!");
    }
  });

function showUserList() {
  const users = getStoredUsers();
  const userTableBody = document.querySelector("#userTable tbody");

  if (users.length === 0) {
    userTableBody.innerHTML = "<tr><td colspan='5'>No users found.</td></tr>";
    return;
  }

  userTableBody.innerHTML = "";

  users.forEach((user, index) => {
    const lockIcon = user.isLocked
      ? '<ion-icon name="lock-closed-outline"></ion-icon>'
      : '<ion-icon name="lock-open-outline"></ion-icon>';

    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.first_name || ""}</td>
            <td>${user.last_name || ""}</td>
            <td>
                <button class="action-button" onclick="toggleLockUser(${index})">
                    ${lockIcon}
                </button>
                <button class="action-button" onclick="showEditUserForm(users[${index}])">Edit</button>
            </td>
        `;
    userTableBody.appendChild(row);
  });

  document.getElementById("userListContainer").style.display = "block";
  hideAddUserForm();
}

function toggleLockUser(index) {
  const users = getStoredUsers();
  const user = users[index];

  user.isLocked = !user.isLocked;

  localStorage.setItem("users", JSON.stringify(users));
  showUserList();
}

document.querySelector(".list-user-click").addEventListener("click", () => {
  document.getElementById("content-home").src = "./user-list.html";
});

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("user-list.html")) {
    showUserList();
  }
});
