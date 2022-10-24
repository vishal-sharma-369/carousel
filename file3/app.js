const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const cardsContainer = document.querySelector('.container')
const cardWidth = cardsContainer.children[2].getClientRects()[0].width + 20;

console.log(cardWidth);

prevButton.addEventListener('click',()=>
{
    let i = cardsContainer.scrollLeft;
    let initial = i;

    const interval = setInterval(() => {
        cardsContainer.scrollLeft = i;
        i-=4;
        if(initial-i==cardWidth)clearInterval(interval)
    }, 1);
})

nextButton.addEventListener('click',()=>
{
    let i = cardsContainer.scrollLeft;
    let initial = i;
    const interval = setInterval(() =>{
        cardsContainer.scrollLeft = i;
        i+=4;
        console.log(i)
        if(i - initial==cardWidth) clearInterval(interval);
    }, 1);
})