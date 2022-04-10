import { getTableElems } from "./tableElems.js";
import maxLettersInColumn from './maxLettersInRow.js';

export default function(index = 0) {
    let ids = [0, 2, 3];
    let mainContentElems = getTableElems();
    
    if(index === -1) index = mainContentElems.length - 1;
    
    let contentItems = mainContentElems[index].querySelectorAll('span');
    let letterLen = maxLettersInColumn(ids.map(el => [contentItems[el], el]));
alert(index);
//alert(letterLen);
console.log(letterLen);
    letterLen.map(arr => {
        let [len, ind] = arr;

        let item = contentItems[ind];
        //if(len) {
            let itemText = item.innerText;
            itemText = itemText.substr(0, len - 4) + '...';
            item.innerText = itemText;
            //alert(len, ind);
            // let str = '';
            // for(let j = 0; j < letterLen[i] - 4; j++) {
            //     str += itemText[j];
            // }
            //item.innerText = str + '...';
        //}
    });

    // for(let i = 0; i < letterLen.length; i++) {
        
    //     let item = contentItems[ids[i]];
    //     if(letterLen[i]) {
    //         let itemText = item.innerText;
    //         let str = '';
    //         for(let j = 0; j < letterLen[i] - 4; j++) {
    //             str += itemText[j];
    //         }
    //         item.innerText = str + '...';
    //     }
    // }
}