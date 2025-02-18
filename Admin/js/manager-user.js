function toggleMenu(hamburger) {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
    
    // Toggle active class for both hamburger icons
    document.querySelectorAll('.hamburger').forEach(icon => {
        icon.classList.toggle('active');
    });
}
/*admin data*/
document.addEventListener("DOMContentLoaded", function () {
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
  
    const logoutButton = document.getElementById("logout-btn");
  
    // Handle the logout functionality
    logoutButton.addEventListener("click", function () {
      // Optionally, clear user data from localStorage or sessionStorage
      localStorage.removeItem("currentUser"); // Example: remove the logged-in user from localStorage
  
      // Redirect to home page (you can modify the URL as needed)
      window.location.replace("../index.html"); // Redirect to the home page
    });


    const users = [
      {
          id: "CT001",
          username: "user1",
          email: "user1@example.com",
          firstName: "First1",
          lastName: "Last1"
      },
      {
          id: "user4323",
          username: "user2",
          email: "user2@example.com",
          firstName: "First2",
          lastName: "Last2"
      },
      {
          id: "user4324",
          username: "user3",
          email: "user3@example.com",
          firstName: "First3",
          lastName: "Last3"
      },
      {
          id: "user4325",
          username: "user4",
          email: "user4@example.com",
          firstName: "First4",
          lastName: "Last4"
      },
      {
          id: "user4326",
          username: "user5",
          email: "user5@example.com",
          firstName: "First5",
          lastName: "Last5"
      },
      {
          id: "user4327",
          username: "user6",
          email: "user6@example.com",
          firstName: "First6",
          lastName: "Last6"
      }
  ];

  // Store users in local storage
  localStorage.setItem("userList", JSON.stringify(users));

  
  // Automatically set admin name on page load if already logged in
  updateLoginButton();

  // Function to load users from local storage and populate the table
  function loadUsers() {
      const users = JSON.parse(localStorage.getItem("userList")) || [];
      users.forEach(user => {
        addUserToTable(user)
      });
  }

  // Load users into the table
  loadUsers();
  

  const save = document.querySelector('.save-btn');

  save.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission
    const name = document.querySelector("#username");
    const email = document.querySelector("#email");
    const firstName = document.querySelector("#firstname");
    const lastName = document.querySelector("#lastname");

    // if (name.value === "" || email.value === "" || firstName.value === "" || lastName.value === "") {
    //     alert("Please fill in all required information");
    //     console.log("Please fill in all required information");
    //     // showEditUserForm();
    //     return;
    // } else {
        showConfirmation();
    // }
  });

    
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
  
  let userIdCounter = 4321; // Starting ID
  
  // Function to show the add user modal
  function showAddUserForm() {
    document.getElementById("modalTitle").innerText = "Add User";
    document.getElementById("userModal").style.display = "flex";
    clearFormFields(); // Clear the input fields when adding a new user
  }
  
  // Function to show the edit user modal with pre-filled data
  function showEditUserForm(userId) {
    document.getElementById("modalTitle").innerText = "View User";
    document.getElementById("userModal").setAttribute("data-view-id", userId);

    const users = JSON.parse(localStorage.getItem("userList")) || [];
    const user = users.find(u => u.id === userId);

    if (user) {
        document.getElementById("username").value = user.username;
        document.getElementById("email").value = user.email;
        document.getElementById("firstName").value = user.firstName;
        document.getElementById("lastName").value = user.lastName;

        // Make fields read-only
        document.getElementById("username").readOnly = true;
        document.getElementById("email").readOnly = true;
        document.getElementById("firstName").readOnly = true;
        document.getElementById("lastName").readOnly = true;

        document.getElementById("userModal").style.display = "flex";
    } else {
        console.error(`User with ID ${userId} not found.`);
    }
  }

  
  // Function to save user data
  function saveUser() {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email format.");
        return;
    }

    // Validation: Check if all fields are filled
    if (!username || !email || !firstName || !lastName) {
      alert("All fields are required.");
      return; // Exit the function without saving
    }
  
    const modalTitle = document.getElementById("modalTitle").innerText;
    const isEdit = modalTitle === "Edit User";
  
    // let users = JSON.parse(localStorage.getItem("userList")) || [];
  
    // if (!isEdit) {
    //   // Handle edit user logic
    //   const userId = document
    //     .getElementById("userModal")
    //     .getAttribute("data-edit-id");
    //   const row = document.getElementById(userId);
    //   row.cells[1].innerText = username;
    //   row.cells[2].innerText = email;
    //   row.cells[3].innerText = firstName;
    //   row.cells[4].innerText = lastName;
  
    //   // Update the user data in localStorage
    //   const userIndex = users.findIndex((user) => user.id === userId);
    //   if (userIndex > -1) {
    //     users[userIndex] = {
    //       id: userId,
    //       username,
    //       email,
    //       firstName,
    //       lastName,
    //     };
    //   }
    // } else {
    //   // Handle add new user logic
    //   userIdCounter++; // Increment ID for the new user
    //   const newUserId = `user${userIdCounter}`; // Create a unique ID
    //   const newUser = {
    //     id: newUserId,
    //     username,
    //     email,
    //     firstName,
    //     lastName,
    //   };
  
    //   // Add the new user to localStorage
    //   users.push(newUser);
  
    //   // Render new row in the table
    //   addUserToTable(newUser);
    // }
  
    // // Save updated user list to localStorage
    // localStorage.setItem("userList", JSON.stringify(users));
  
    // closeModal();


      if (!isEdit) {
        // Logic thêm user mới
        userIdCounter++;
        const newUserId = `user${userIdCounter}`;
        const newUser = { id: newUserId, username, email, firstName, lastName };

        const users = JSON.parse(localStorage.getItem("userList")) || [];
        users.push(newUser);
        localStorage.setItem("userList", JSON.stringify(users));

        addUserToTable(newUser);
        alert("User added successfully!");

    } else {
        // Không thực hiện logic chỉnh sửa
        alert("Chỉnh sửa người dùng hiện có không được phép.");
    }

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

    // if (window.innerWidth <= 480) {
    
    cell4.classList.add("hide1");
    cell5.classList.add("hide2");
    // }
  
    cell6.innerHTML = `

    <button class="button lock" onclick="toggleLock('${user.id}')">
    <ion-icon name="lock-closed-outline"></ion-icon></button>
    <button class="button edit" onclick="showEditUserForm('${user.id}')">
    <ion-icon name="create-outline"></ion-icon></button>
    `;
  }
  
  // Function to toggle lock/unlock status
  function toggleLock(userId) {
    // Hiển thị hộp thoại xác nhận
    document.getElementById('confirmLockModal').style.display = 'flex';

  
    // Xử lý sự kiện khi người dùng click "Yes"
    const confirmLockBtn = document.getElementById('confirmLockBtn');
    confirmLockBtn.onclick = function() {
      const row = document.getElementById(userId);
      const lockButton = row.querySelector(".lock ion-icon");
      const isLocked = lockButton.getAttribute("name") === "lock-closed-outline";
  
      if (isLocked) {
        lockButton.setAttribute("name", "lock-open-outline");
      } else {
        lockButton.setAttribute("name", "lock-closed-outline");
      }
      closeConfirmModal(); // Đóng hộp thoại sau khi xác nhận
    };
  }
  
  function closeConfirmModal() {
    document.getElementById('confirmLockModal').style.display = 'none';
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
  
  // let userToDelete = null; // Temporary variable to store the user ID to delete
  
  // // Show the confirmation modal
  // function showConfirmModal(userId) {
  //   userToDelete = userId; // Set the user ID to be deleted
  //   document.getElementById("confirmDeleteModal").style.display = "flex";
  // }
  
  // // Close the confirmation modal
  // function closeConfirmModal() {
  //   document.getElementById("confirmDeleteModal").style.display = "none";
  //   userToDelete = null; // Reset the user ID
  // }
  
  // Confirm deletion
  // document
  //   .getElementById("confirmDeleteBtn")
  //   .addEventListener("click", function () {
  //     if (userToDelete) {
  //       // Proceed to delete the user
  //       document.getElementById(userToDelete).remove();
  
  //       let users = JSON.parse(localStorage.getItem("userList")) || [];
  //       users = users.filter((user) => user.id !== userToDelete);
  //       localStorage.setItem("userList", JSON.stringify(users));
  
  //       closeConfirmModal(); // Close the modal after deleting
  //     }
  //   });