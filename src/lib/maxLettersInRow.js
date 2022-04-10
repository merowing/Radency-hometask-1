function maxLettersInColumn(items) {
    //let arr = [];

    return items.map(item => {
        let [elem, id] = item;
        let itemText = elem.innerText;
    
        elem.style.whiteSpace = 'nowrap';
        let itemWidth = elem.offsetWidth;
        elem.removeAttribute('style');
        
        let lettersLen = itemText.length;
        let textBlockWidth = elem.parentElement.offsetWidth;
        let maxLetters = Math.floor(textBlockWidth / Math.ceil(itemWidth/lettersLen));
    
        if(textBlockWidth > itemWidth) maxLetters = 0;
        
        return [maxLetters, id];
    }).filter(elem => elem[0] !== 0);

    // for(let i = 0; i < items.length; i++) { 
    //     let itemText = items[i].innerText;
    
    //     items[i].style.whiteSpace = 'nowrap';
    //     let itemWidth = items[i].offsetWidth;
    //     items[i].removeAttribute('style');
        
    //     let lettersLen = itemText.length;
    //     let textBlockWidth = items[i].parentElement.offsetWidth;
    //     let maxLetters = Math.floor(textBlockWidth / Math.ceil(itemWidth/lettersLen));
    
    //     if(textBlockWidth > itemWidth) maxLetters = 0;
    //     arr[arr.length] = maxLetters;
    // }
    
    //return arr;
}

export default maxLettersInColumn;