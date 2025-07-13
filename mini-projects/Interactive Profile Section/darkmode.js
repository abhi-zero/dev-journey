let darkmode = localStorage.getItem('darkmode')
const themeToggleButton = document.querySelector('.toggle-theme');

function enableDarkmode(){
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode','active');
}
function disableDarkmode(){
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode',null);
}

if(darkmode === 'active') enableDarkmode()

themeToggleButton.addEventListener('click', ()=>{
    darkmode = localStorage.getItem('darkmode');
    darkmode !== 'active'? enableDarkmode() : disableDarkmode();
}
)