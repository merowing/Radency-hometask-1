import getCategory from './lib/getCategory.js';

let noteCategory = document.querySelector('#noteCategory');

let categories = getCategory();
let categoryFragment = document.createDocumentFragment();
for(let i = 0; i < categories.length; i++) {
    let elemOption = document.createElement('option');
    elemOption.value = i;
    elemOption.innerText = categories[i];
    categoryFragment.appendChild(elemOption);
}
noteCategory.appendChild(categoryFragment);