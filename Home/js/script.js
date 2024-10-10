function toggleMenu(hamburger) {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
    
    // Toggle active class for both hamburger icons
    document.querySelectorAll('.hamburger').forEach(icon => {
        icon.classList.toggle('active');
    });
}

function myFunction() {
    const input = document.getElementById('search');
    // Add your search functionality here
}

/*login*/
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelectorAll('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const blurOverlay = document.querySelector('.blur-overlay');
const btnOutPopup = document.querySelectorAll('.btnLogout-popup');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
    blurOverlay.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
    
});

btnPopup.forEach(btn => {
    btn.addEventListener('click', () => {
        wrapper.classList.add('active-popup');
        blurOverlay.classList.add('active');
    });
});

btnOutPopup.forEach(btn => {
    btn.addEventListener('click', () => {
        wrapper.classList.add('active-popup');

        registerLink.addEventListener('click', () => {
            wrapper.classList.add('active');
            blurOverlay.classList.add('active');
        });
        
        blurOverlay.classList.add('active');
    });
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    blurOverlay.classList.remove('active');
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

    //Render
    const filterInputs = document.querySelectorAll('.filter-input');
    const tabContents = document.querySelectorAll('.tab_content');
    const navLinks = document.querySelectorAll('.nav-links label');

    // Function to filter items with animation
    function filterItems(category) {
        // Remove active class from all tabs
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to selected tab
        const activeLink = document.querySelector(`label[for="filter-${category.toLowerCase()}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Hide all sections first
        tabContents.forEach(content => {
            content.style.opacity = '0';
            setTimeout(() => {
                content.style.display = 'none';
            }, 300); // Match this with CSS animation duration
        });

        // Show selected section with animation
        const selectedContent = document.getElementById(category);
        if (selectedContent) {
            setTimeout(() => {
                selectedContent.style.display = 'grid';
                requestAnimationFrame(() => {
                    selectedContent.style.opacity = '1';
                });
            }, 300);
        }
    }

    // Add click event listeners to all filter inputs
    filterInputs.forEach(input => {
        input.addEventListener('change', function() {
            const category = this.id.replace('filter-', '');
            filterItems(category === 'all' ? 'All' : category === 'mousse' ? 'Mouse' : category.charAt(0).toUpperCase() + category.slice(1));
        });
    });

    // Function to create a new item card
    function createItemCard(item) {
        const card = document.createElement('div');
        card.className = 'movie-item';
        card.innerHTML = `
            <a href="#">
                <img class="poster-img" height="300" width="300" src="${item.image}" alt="${item.name}">
            </a>
            <p class="title">${item.name}</p>
            <button class="butn title">
                <p class="text-color">Price: ${item.price}</p>
            </button>
        `;
        return card;
    }

    // Function to add items to a category
    function addItemsToCategory(categoryId, items) {
        const container = document.getElementById(categoryId);
        if (container) {
            items.forEach(item => {
                container.appendChild(createItemCard(item));
            });
        }
    }

    // Sample data structure for items
    const menuItems = {
        Mousse: [
            { name: 'Avocado Mousse', price: '5,000,000 VND', image: 'img/Mousse/Avocado_Mousse.jpg' },
            { name: 'Blueberry Mousse', price: '5,000,000 VND', image: 'img/Mousse/Blueberry_Mousse.jpg' },
            { name: 'Corn Mousse', price: '5,000,000 VND', image: 'img/Mousse/Corn_Mousse.jpg' },
            { name: 'Longan Mousse', price: '5,000,000 VND', image: 'img/Mousse/Longan_Mousse.jpg' },
            { name: 'Mango Mousse', price: '5,000,000 VND', image: 'img/Mousse/Mango_Mousse.jpg' },
            { name: 'Melon Mousse', price: '5,000,000 VND', image: 'img/Mousse/Melon_Mousse.jpg'},
        ],
        Croissant: [
            { name: 'Avocado Croissant', price: '1,000,000 VND', image: 'img/Croissant/Avocado_Croissant.jpg' },
            { name: 'Choco Mallow Croissant', price: '1,000,000 VND', image: 'img/Croissant/Choco_Mallow_Croissant.png' },
            { name: 'Dinosaur Almond Croissant', price: '1,000,000 VND', image: 'img/Croissant/Dinosaur_Almond_Croissant.png' },
            { name: 'Honey Almond Croissant', price: '1,000,000 VND', image: 'img/Croissant/Honey_Almond_Croissant.png' },
            { name: 'Matcha Croissant', price: '1,000,000 VND', image: 'img/Croissant/Matcha_Croissant.jpg' },
            { name: 'Plain Croissant', price: '1,000,000 VND', image: 'img/Croissant/Plain_Croissant.png' },
        ],
        Drink: [
            { name: 'Choco Mallow', price: '500,000 VND', image: 'img/Drink/Choco_Mallow.png' },
            { name: 'Lemon Tea', price: '500,000 VND', image: 'img/Drink/Lemon_Tea.png' },
            { name: 'Lychee Tea', price: '500,000 VND', image: 'img/Drink/Lychee_Tea.png' },
            { name: 'Matcha Latte', price: '500,000 VND', image: 'img/Drink/Matcha_Latte.png' },
            { name: 'Matcha Mallow', price: '500,000 VND', image: 'img/Drink/Matcha_Mallow .png' },
            { name: 'Matcha Misu', price: '500,000 VND', image: 'img/Drink/Matcha_Misu.png' },
        ]
    };

    // Initialize items in each category and All section
    Object.entries(menuItems).forEach(([category, items]) => {
        // Add to category-specific section
        addItemsToCategory(category === 'Mousse' ? 'Mouse' : category, items);
        
        // Add to All section
        addItemsToCategory('All', items);
    });

    filterInputs.forEach(input => {
        input.addEventListener('change', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
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
