const buttons = document.querySelectorAll('.carouselbutton')

const slides = document.querySelector('[data-slide-list]');
const nextbutton = document.querySelector('[data-carousel-button="next"]')
const prevButton = document.querySelector('[data-carousel-button="prev"]');
let widthofeachslide = slides.children[0].getClientRects()[0].width;
const dotscontainer = document.querySelector('.dotscontainer');

[...slides.children].forEach((slide,index)=>
{
    slides.children[index].style.left = widthofeachslide*index + 'px';
})

window.onresize =()=>
{
    [...slides.children].forEach(list=>
        {
            list.style.width = '100vw';
            list.querySelector('img').style.width = '100vw';
            console.log(list.querySelector('img'))
        })
    widthofeachslide = slides.children[0].getClientRects()[0].width;
    [...slides.children].forEach((slide,index)=>
    {
        slides.children[index].style.left = widthofeachslide*index + 'px';
    })
}


nextbutton.addEventListener('click',()=>
{
    const currentdot = document.querySelector('[data-active-button]');
    const currentslide = document.querySelector('[data-active]');
    const newslideindex = Array.from(slides.children).indexOf(currentslide) + 1;
    nextbutton.style.opacity = newslideindex<slides.children.length-1?1:0;
    prevButton.style.opacity = newslideindex>0?1:0;
    if(newslideindex>=slides.children.length)return;
    delete currentslide.dataset.active;
    slides.children[newslideindex].dataset.active=true;
    console.log('clicked')
    slides.style.transform = 'translateX(-'+widthofeachslide*newslideindex+'px)';
    dotscontainer.children[newslideindex].dataset.activeButton = true;
    delete currentdot.dataset.activeButton;
})

prevButton.addEventListener('click',()=>
{
    const currentdot = document.querySelector('[data-active-button]');
    const currentslide = document.querySelector('[data-active]');
    const prevslide = currentslide.previousElementSibling;
    const previousIndex = Array.from(slides.children).indexOf(prevslide);
    
    prevButton.style.opacity = previousIndex<=0?0:1;
    nextbutton.style.opacity = previousIndex<slides.children.length-1?1:0;
    if(prevslide==null)return;
    const amounttomove = prevslide.style.left;
    slides.style.transform ='translateX(-'+amounttomove+')';
    prevslide.dataset.active = true;
    delete currentslide.dataset.active;
    dotscontainer.children[previousIndex].dataset.activeButton = true;
    delete currentdot.dataset.activeButton;
})


Array.from(dotscontainer.children).forEach(dot => {
    dot.addEventListener('click',(e)=>
    {
        const currentdot = document.querySelector('[data-active-button]');
        const newindex = [...dotscontainer.children].indexOf(e.target.closest('.dot'));
        prevButton.style.opacity = newindex>0?1:0;
        nextbutton.style.opacity = newindex<dotscontainer.children.length-1?1:0;
        slides.style.transform = 'translateX(-'+widthofeachslide*newindex+'px)';
        delete currentdot.dataset.activeButton
        dotscontainer.children[newindex].dataset.activeButton = true;
    })
}); 

prevButton.style.opacity = 0;


// buttons.forEach(button=>
//     {
//         button.addEventListener('click',()=>
//         {
//             const offset = button.dataset.carouselButton=='next'?1:-1;
//             const activeSlide = document.querySelector('[data-active]');
//             const slides = button.closest('.container').querySelector('[data-slide-list]');
//             const currentIndex = [...slides.children].indexOf(activeSlide);
//             let newIndex = currentIndex + offset;
//             if(newIndex >= slides.children.length)newIndex = 0;
//             if(newIndex <0) newIndex = slides.children.length - 1;
//             slides.children[newIndex].dataset.active = true;
//             delete activeSlide.dataset.active;
//             console.log('worked')
//         })
//     })

