import getCategory from "./getCategory.js";

export default function(id, {name, category, date, content, archived}) {
    
    let main = document.querySelectorAll('.mainContent > div')[id];
    let elems = main.querySelectorAll('li');
    if(main.classList.contains('archived') && !archived) main.classList.remove('archived');
    let dateString = date.join(', ');
    let categoryParams = getCategory(category);

    elems[0].querySelector('div').innerText = categoryParams.name[0];
    elems[0].querySelector('div').style.backgroundColor = categoryParams.color;
    elems[1].querySelector('span').innerText = name;
    elems[3].querySelector('span').innerText = categoryParams.name;
    elems[4].querySelector('span').innerText = content;
    elems[5].querySelector('span').innerText = dateString;

}