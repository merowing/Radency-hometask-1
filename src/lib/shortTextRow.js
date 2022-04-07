import { getTableElems } from "./tableElems.js";
import maxLettersInColumn from './maxLettersInRow.js';

export default function(index) {
    let ids = [0, 2, 3];
    let mainContentElems = getTableElems();
    
    if(index === -1) index = mainContentElems.length - 1;
    if(!mainContentElems.length) index = 0;

    let contentItems = mainContentElems[index].querySelectorAll('span');
    let letterLen = maxLettersInColumn(ids.map(el => contentItems[el]));

    for(let i = 0; i < letterLen.length; i++) {
        
        let item = mainContentElems[index].querySelectorAll('span')[ids[i]];
        if(letterLen[i]) {
            let itemText = item.innerText;
            let str = '';
            for(let j = 0; j < letterLen[i] - 4; j++) {
                str += itemText[j];
            }
            item.innerText = str + '...';
        }
    }
}