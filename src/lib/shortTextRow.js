import { getTableElems } from "./tableElems.js";
import maxLettersInColumn from './maxLettersInRow.js';

export default function(index = 0) {
    let ids = [0, 2, 3];
    let mainContentElems = getTableElems();
    
    if(index === -1) index = mainContentElems.length - 1;
    
    let contentItems = mainContentElems[index].querySelectorAll('span');
    let letterLen = maxLettersInColumn(ids.map(el => [contentItems[el], el]));

    letterLen.forEach(arr => {
        let [len, ind] = arr;

        let item = contentItems[ind];
        let itemText = item.innerText;
        itemText = itemText.substr(0, len - 4) + '...';
        item.innerText = itemText;
    });

}