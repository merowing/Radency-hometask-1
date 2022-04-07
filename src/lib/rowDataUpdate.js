import getCategory from "./getCategory.js";

export default function(id, {name, category, date, content}) {
    console.log(id);
    let elems = document.querySelectorAll('.mainContent > div')[id].querySelectorAll('li');

    elems[1].querySelector('span').innerText = name;
    elems[3].querySelector('span').innerText = getCategory(category);
    elems[4].querySelector('span').innerText = content;
    elems[5].querySelector('span').innerText = date.join(', ');
}