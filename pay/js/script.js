// Select hamburger and mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// Toggle active state on click
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active'); // Toggle hamburger 'X' animation
    mobileMenu.classList.toggle('active'); // Slide in/out the menu
});


/*admin data*/
document.addEventListener('DOMContentLoaded', function() {
    
    const blurOverlay = document.querySelector('.blur-overlay'); // Make sure this exists in your HTML
    const btnCart = document.querySelectorAll('.sp-cart');
    const shoppingCart = document.querySelector('.shopping-cart'); // Only one shopping-cart
    const close = document.querySelectorAll('.shopping-cart .close');

    btnCart.forEach(btn => {
        btn.addEventListener('click', () => {
            if (shoppingCart) {
                shoppingCart.classList.add('active'); // Change display to make the cart visible
                blurOverlay.classList.add('active'); // Optional: Only if blur overlay exists
            }
        });
    });

    close.forEach(btn => {
        btn.addEventListener('click', () => {
            if (shoppingCart) {
                shoppingCart.classList.remove('active'); // Change display to make the cart visible
                blurOverlay.classList.remove('active'); // Optional: Only if blur overlay exists
            }
        });
    });
    
    

    const loginBtns = document.querySelectorAll('.btnLogin-popup');
    const logoutBtns = document.querySelectorAll('.btnLogout-popup');

       // Function to get current user from localStorage
    function getCurrentUser() {
        const currentUser = localStorage.getItem('UserStr');
        return currentUser ? JSON.parse(currentUser) : null;
    }

    // Function to update all login buttons if admin is logged in
    function updateLoginButtons() {
        const currentUser = getCurrentUser(); // Get the current user from localStorage
        console.log('Current user from localStorage:', currentUser); // Debug log
    
        if (currentUser) { 
            loginBtns.forEach(button => {
                button.textContent = currentUser.username; // Set the button text to the user's name
                button.classList.add('logged-in'); // Add a class to indicate user is logged in
            });
        } else {
            loginBtns.forEach(button => {
                button.textContent = 'Login'; // Reset button text to "Login"
                button.classList.remove('logged-in'); // Remove the logged-in class
            });
        }
    }
    updateLoginButtons();
    

    // // Create wrapper functions for localStorage
    // window.userStorage = {
    //     setCurrentUser: function(userData) {
    //         localStorage.setItem('currentUser', JSON.stringify(userData));
    //         updateLoginButtons();
    //     },
    //     getCurrentUser: function() {
    //         return getCurrentUser();
    //     },
    //     removeCurrentUser: function() {
    //         localStorage.removeItem('currentUser');
    //         updateLoginButtons();
    //     }
    // };
    
    // Setup storage event listener for cross-tab updates
    window.addEventListener('storage', function(e) {
        if (e.key === 'UserStr') {
            console.log('Storage event triggered:', e); // Debug log
            updateLoginButtons();
        }
    });

    // Handle the logout functionality for both logout buttons (mobile and desktop)
    logoutBtns.forEach(button => {
        button.addEventListener('click', function() {
            console.log("Logout button clicked");
            localStorage.removeItem('UserStr');
            updateLoginButtons(); // Update buttons immediately after logout
            alert('Logout successful!');
            window.location.href = '../../Home/HomePage/index.html';
        });
    });

    window.addEventListener('userLoggedIn', function(e) {
        updateLoginButtons();
    });


    const btn = document.querySelector('.pay-button');

    // Function to show confirmation
    function showConfirmation() {
        document.querySelector('.my-order').style.display = 'none';
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('confirmation').style.display = 'block';
    }

    // Function to auto-fill the form from local storage for a logged-in user
    function autoFillForm() {
        const currentUser = getCurrentUser();

        // document.getElementById("full_name").value = currentUser.username;
        // document.getElementById("phone").value = localStorage.getItem("user_phone") || "";
        // document.getElementById("address").value = localStorage.getItem("user_address") || "";
        // document.getElementById("delivery_date").value = localStorage.getItem("user_delivery_date") || "";
        // document.getElementById("note").value = localStorage.getItem("user_note") || "";
    
        

        console.log("Auto-fill function called");
        console.log("Full Name from Local Storage:", currentUser.username);
        document.getElementById("full_name").value = currentUser.username || "";
        document.getElementById("phone").value = currentUser.phone || "";
        document.getElementById("address").value = currentUser.address || "";
    
    }

    // Function to clear the form
    function clearForm() {
        document.getElementById("full_name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("address").value = "";
        document.getElementById("delivery_date").value = "";
        document.getElementById("note").value = "";
    }

    // Event listener for the pay button
    btn.addEventListener('click', function() {
        const name = document.querySelector("#full_name");
        const phone = document.querySelector("#phone");
        const address = document.querySelector("#address");
        const date = document.querySelector("#delivery_date");

        if (name.value === "" || phone.value === "" || address.value === "" || date.value === "") {
            alert("Please fill in all required information");
        } else {
            showConfirmation();
        }
    });

    // Event listeners for radio buttons
    document.getElementById("autoFill").addEventListener("change", function() {
        if (this.checked) {
            autoFillForm();
        }
    });

    document.getElementById("clearFill").addEventListener("change", function() {
        if (this.checked) {
            clearForm();
        }
    });

    // Initial auto-fill if 'Auto fill' is selected by default
    window.onload = function() {
        if (document.getElementById("autoFill").checked) {
            autoFillForm();
        }
    };


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


const btn = document.querySelector('.pay-button');

// Add this line to ensure the DOM is fully loaded before adding the event listener
btn.addEventListener('click', function() {
    const name = document.querySelector("#full_name");
    const phone = document.querySelector("#phone");
    const address = document.querySelector("#address");
    const date = document.querySelector("#delivery_date"); // Add this line to get the date input

    

    if(name.value === "" || phone.value === "" || address.value === "" || date.value === ""){
        console.log(name.value);
        alert("Please fill in all required information");
    } else {
        // If all fields are filled, you can proceed with the payment process
        // Add your payment processing logic here
        showConfirmation();
    }

});

    // Function to auto-fill the form from local storage for a logged-in user
    function autoFillForm() {
        document.getElementById("full_name").value = localStorage.getItem("user_full_name") || "";
        document.getElementById("phone").value = localStorage.getItem("user_phone") || "";
        document.getElementById("address").value = localStorage.getItem("user_address") || "";
        document.getElementById("delivery_date").value = localStorage.getItem("user_delivery_date") || "";
        document.getElementById("note").value = localStorage.getItem("user_note") || "";
    }

    // Function to clear the form
    function clearForm() {
        document.getElementById("full_name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("address").value = "";
        document.getElementById("delivery_date").value = "";
        document.getElementById("note").value = "";
    }

    // Event listeners for radio buttons
    document.getElementById("autoFill").addEventListener("change", function() {
        if (this.checked) {
            autoFillForm();
        }
    });

    document.getElementById("clearFill").addEventListener("change", function() {
        if (this.checked) {
            clearForm();
        }
    });

    // Initial auto-fill if 'Auto fill' is selected by default
    window.onload = function() {
        if (document.getElementById("autoFill").checked) {
            autoFillForm();
        }
    };

