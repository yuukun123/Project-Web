
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
});

/*search*/
// document.addEventListener('DOMContentLoaded', function() {
//     const input = document.getElementById('search');
//     const label = document.querySelector('label[for="search"]');

//     // Function to check if input is focused or has value
//     function toggleLabel() {
//         console.log('Input value:', input.value);
//         if (input.value.trim() !== "" || document.activeElement === input) {
//             console.log('Adding floating class');
//             label.classList.add('floating');
//         } else {
//             console.log('Removing floating class');
//             label.classList.remove('floating');
//         }
//     }
    

//     // Event listeners for focus, blur, and input changes
//     input.addEventListener('focus', toggleLabel);
//     input.addEventListener('blur', toggleLabel);
//     input.addEventListener('input', toggleLabel);
// });


