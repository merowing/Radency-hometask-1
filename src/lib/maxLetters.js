function maxLetters(items) {
    let arr = [];
    for(let i = 0; i < items.length; i++) { 
        let itemText = items[i].innerText;
    
        items[i].style.whiteSpace = 'nowrap';
        let itemWidth = items[i].offsetWidth;
        items[i].removeAttribute('style');
    
        let lettersLen = itemText.length;
        let textBlockWidth = items[i].parentElement.offsetWidth;
        let maxLetters = Math.floor(textBlockWidth / Math.ceil(itemWidth/lettersLen));
    
        if(textBlockWidth > itemWidth) maxLetters = 0;
        arr[arr.length] = maxLetters;
    }

    return arr;
}

export default maxLetters;