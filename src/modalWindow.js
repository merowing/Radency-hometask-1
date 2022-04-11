import getCategory from './lib/getCategory.js';
import { getIds } from './lib/rowId.js';
import { getDateFromContent, getDateNow } from './lib/getDate.js';
import { getDatabase, setDatabaseItem } from './lib/database.js';
import { addNewRow } from './lib/createTable.js';
import { addNewTableElement } from './lib/tableElems.js'
import rowDataUpdate from './lib/rowDataUpdate.js';
import shortTextRow from './lib/shortTextRow.js';
import createArchive from './lib/createArchive.js';

let categories = getCategory();
let categoryFragment = categories.reduce((prev, current, ind) => {
    let elemOption = document.createElement('option');
    elemOption.value = ind;
    elemOption.innerText = current;
    prev.appendChild(elemOption);

    return prev;
}, document.createDocumentFragment());
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

modalNoteButton.addEventListener('click', (e) => {
    let {databaseRowId, tableId} = getIds();

    let elems = modalWindow.querySelectorAll('div [name]');
    let [name, category, description, archived] = [...elems].map(el => el.value);

    let date = getDateFromContent(description);

    category = +category;
    archived = !!(+archived);

    if(!name) {
        alert('Please, fill the name of note!');
        return null;
    }

    if(modalNoteButton.getAttribute('edit')) {
        setDatabaseItem({name, category, content:description, archived}, databaseRowId, true); // data, id, edit = true
        rowDataUpdate(tableId, date, getDatabase(databaseRowId));
        shortTextRow(tableId);
    }else {
        let created = getDateNow();
        setDatabaseItem({name, created, category, content:description});
        
        addNewTableElement();
        addNewRow(getDatabase(-1));

        shortTextRow(-1);
    }

    hideModalWindow();
    createArchive();
});

export {modalWindow, bg, modalNoteButton};