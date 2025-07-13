const seemoreButton = document.querySelector('.see-more');
const card = document.querySelector('.card')
const nm = document.querySelector('.info .name')
const allProjects = document.querySelectorAll('.project');
const projectTitle = document.querySelector('.project-title .title')
function cardMobileView(){
    console.log("me")
    
    card.classList.toggle('up');
    if(card.classList.contains('up')){
        seemoreButton.textContent = `close`;
    }else{
        seemoreButton.innerHTML = `See Projects <i class="ri-arrow-drop-down-line"></i>`;
    }
}

function cardDektopView(){
    seemoreButton.classList.toggle('ontop');
    if(seemoreButton.classList.contains('ontop')){
        seemoreButton.scrollIntoView({behavior: "smooth", block :"start"})
        seemoreButton.textContent = "Go back"
    }else{
        nm.scrollIntoView({behavior: "smooth", block: "end"})
        seemoreButton.innerHTML = `See Projects <i class="ri-arrow-drop-down-line"></i>`;
    } 
}

seemoreButton.addEventListener('click',()=>{
    if(window.innerWidth < 768){
        cardMobileView()
    }
    else{
        cardDektopView()
    }
    
});



allProjects.forEach((project) => {
    project.addEventListener('mouseover', ()=> {
        projectTitle.style.opacity = 1;      
        const projectName = project.dataset.name;   
        projectTitle.textContent = projectName;  
    })
     project.addEventListener('mouseleave', () => {
    projectTitle.style.opacity = 0;
  });
})