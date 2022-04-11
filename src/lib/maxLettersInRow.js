function maxLettersInColumn(items) {
    
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

}

export default maxLettersInColumn;