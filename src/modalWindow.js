import getCategory from './lib/getCategory.js';
import { getIds } from './lib/rowId.js';
import getDate from './lib/getDate.js';
import { getDatabase, setDatabaseItem } from './lib/database.js';
import { addNewRow } from './lib/createTable.js';
import { addNewTableElement } from './lib/tableElems.js'
import rowDataUpdate from './lib/rowDataUpdate.js';
import shortTextRow from './lib/shortTextRow.js';
import createArchive from './lib/createArchive.js';

let categories = getCategory();
let categoryFragment = document.createDocumentFragment();
for(let i = 0; i < categories.length; i++) {
    let elemOption = document.createElement('option');
    elemOption.value = i;
    elemOption.innerText = categories[i];
    categoryFragment.appendChild(elemOption);
}
document.querySelector('#noteCategory').appendChild(categoryFragment);

let closeNote = document.querySelector('button.noteClose');
let bg = document.querySelector('.background');
let modalWindow = document.querySelector('.addNoteModalWindow');
let modalNoteButton = document.querySelector('#noteButton > button');

closeNote.addEventListener('click', () => {
    hideModalWindow();
});
bg.addEventListener('click', () => {
    hideModalWindow();
});

function hideModalWindow() {
    bg.classList.add('hidden');
    modalWindow.classList.add('hidden');
}

let checkboxArchived = document.querySelector('.checkboxArchived label');
checkboxArchived.addEventListener('click', function() {
    let input = this.querySelector('input');
    input.value = input.checked ? 1 : 0;
    return false;
});

modalNoteButton.addEventListener('click', () => {
    let {databaseRowId, tableId} = getIds();

    let elems = modalWindow.querySelectorAll('div [name]');
    let [name, category, dateFrom, dateTo, description, archived] = [...elems].map(el => el.value);

    let arrDate = [dateFrom, dateTo];
    if(arrDate.every(a => !a)) arrDate = [];

    let date = arrDate.length ? getDate(arrDate) : [];

    category = +category;
    archived = !!(+archived);
    if(modalNoteButton.getAttribute('edit')) {
        setDatabaseItem({name, category, content:description, date, archived}, databaseRowId, true); // data, id, edit = true
        rowDataUpdate(tableId, getDatabase(databaseRowId));
        shortTextRow(tableId);
    }else {
        let created = getDate();
        setDatabaseItem({name, created, category, content:description, date});
        
        addNewTableElement();
        addNewRow(getDatabase(-1));

        shortTextRow(-1);
    }

    hideModalWindow();
    createArchive();
});

export {modalWindow, bg, modalNoteButton};