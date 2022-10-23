const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const slides = document.querySelector('[data-carousel-slides]');
let slideWidth = slides.children[0].getClientRects()[0].width;
const dotscontainer = document.querySelector('.dotscontainer');
Array.from(slides.children).forEach((slide,index)=>
    {
        slide.style.left = slideWidth*index + 'px';
    })

// adding the functionality for the next button
nextButton.addEventListener('click',()=>
{
    const currentSlide = document.querySelector('[data-active]');
    const currentDot = document.querySelector('[data-active-dot]')
    const nextSlide = currentSlide.nextElementSibling;
    if(nextSlide==null)return;
    const nextSlideIndex = Array.from(slides.children).indexOf(nextSlide);
    nextButton.style.display = nextSlideIndex<slides.children.length - 1?'block':'none';
    prevButton.style.display = nextSlideIndex>0?'block':'none';
    slides.style.transform = 'translateX(-'+nextSlide.style.left+')';


    dotscontainer.children[nextSlideIndex].dataset.activeDot = true;
    delete currentDot.dataset.activeDot;
    nextSlide.dataset.active = true;
    delete currentSlide.dataset.active;
})

// adding the functionality for the previous button
prevButton.addEventListener('click',()=>
{
    const currentSlide = document.querySelector('[data-active]');
    const currentDot = document.querySelector('[data-active-dot]');
    const prevSlide = currentSlide.previousElementSibling;
    if(prevSlide==null)return;
    const prevSlideIndex = Array.from(slides.children).indexOf(prevSlide);
    prevButton.style.display = prevSlideIndex>0?'block':'none';
    nextButton.style.display = prevSlideIndex<slides.children.length - 1?'block':'none';

    slides.style.transform = 'translateX(-'+prevSlide.style.left+')';


    dotscontainer.children[prevSlideIndex].dataset.activeDot = true;
    delete currentDot.dataset.activeDot;
    prevSlide.dataset.active= true;
    delete currentSlide.dataset.active;
})


// adding the functionality for the dots
Array.from(dotscontainer.children).forEach(dot=>
    {
        dot.addEventListener('click',(e)=>
        {
            const currentSlide = document.querySelector('[data-active]');
            const targetDot = e.target.closest('.dot');
            const currentDot = document.querySelector('[data-active-dot]');
            const targetIndex = Array.from(dotscontainer.children).indexOf(targetDot);
            nextButton.style.display = targetIndex<slides.children.length-1?'block':'none';
            prevButton.style.display = targetIndex>0?'block':'none';

            slides.style.transform = 'translateX(-'+slideWidth*targetIndex+'px)';

            slides.children[targetIndex].dataset.active = true;
            delete currentSlide.dataset.active;
            targetDot.dataset.activeDot = true;
            delete currentDot.dataset.activeDot;
        })
    })


// finally working with the responsiveness of the window 
window.onresize = ()=>
{
    slideWidth = slides.children[0].getClientRects()[0].width;
    Array.from(slides.children).forEach((slide,index)=>
    {
        slide.style.left = slideWidth*index + 'px';
    })
}