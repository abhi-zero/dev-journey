// mobile navbar functionality

const nav = document.querySelector('.nav-mobile');
const menuButton = document.querySelector('.menu-btn');

menuButton.addEventListener('click', ()=>{
    nav.classList.toggle('open')
})
