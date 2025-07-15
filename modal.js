const openModelBtn = document.querySelector('#openModalBtn');
const modal = document.querySelector('#modal');
const closeModelBtn = document.querySelector('#closeModalBtn')

openModelBtn.addEventListener('click', ()=>{
    modal.showModal();
    document.body.style.overflow = 'hidden';
})
closeModelBtn.addEventListener('click', ()=>{
    document.body.style.overflow = 'auto';
    modal.close();
})

// Close by clicking outside the modal content
modal.addEventListener('click', (e) => {
  const dialogDimensions = modal.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    modal.close();
document.body.style.overflow = 'auto';
  }
});