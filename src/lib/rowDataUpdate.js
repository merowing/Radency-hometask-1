import getCategory from "./getCategory.js";
import dateToString from './dateToString.js';

export default function(id, {name, category, date, content}) {
    let elems = document.querySelectorAll('.mainContent > div')[id].querySelectorAll('li');

    //alert("a:"+date);
    // let dateString = date.join(', ');
    // if(date.some(a => !a) && date !== []) {
    //     let p = '';
    //     let n = 0;
    //     if(date[0] === '') p = 'To: ';
    //     if(date[1] === '') p = 'From: ';
    //     date = date.filter(a => a);
    //     dateString = p + date[0];
    // }
    let dateString = dateToString(date);

    elems[1].querySelector('span').innerText = name;
    elems[3].querySelector('span').innerText = getCategory(category);
    elems[4].querySelector('span').innerText = content;
    elems[5].querySelector('span').innerText = dateString;
}