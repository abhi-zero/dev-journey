// mobile navbar functionality

const nav = document.querySelector('nav');
const menuButton = document.querySelector('.menu');

menuButton.addEventListener('click', ()=>{
    nav.classList.toggle('open-nav')
})
