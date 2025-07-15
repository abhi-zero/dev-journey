const faqsContainer = document.querySelector('.faqs');


function renderFaqs(faqData){
    const faq = document.createElement('div')
    faq.classList.add('faq');

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const question = document.createElement('h3');
    question.textContent = faqData.question;

    const accordIcon = document.createElement('span');
    accordIcon.classList.add('accord-span')
    accordIcon.innerHTML = `<i class="ri-add-circle-line"></i> <i class="ri-indeterminate-circle-line"></i>`

    const accordPara = document.createElement('p');
    accordPara.textContent = faqData.answer;

    questionDiv.append(question,accordIcon);
    faq.append(questionDiv, accordPara);    

    return faq;
}


const url = './assets/data/faq.json';

fetch(url)
.then((response)=>{
    if(!response.ok){
        throw new Error("Something is wrong, Failef to fetch FAQS");  
    }
    return response.json();
})
.then((data)=> {
    data.forEach((question) => {
        const renderedFaqs = renderFaqs(question)
        faqsContainer.appendChild(renderedFaqs)
    })
   
})
.catch((error)=>{
    const errorText = document.createElement('p')
    errorText.textContent = error;
    faqsContainer.appendChild(errorText);
})

console.log(faqsContainer);

faqsContainer.addEventListener('click',(dets)=> {
    element = dets.target.closest('.faq')
    console.log(element);
    console.log(element.classList.contains('faq'));

        element.classList.toggle('accord-open')
    
})



