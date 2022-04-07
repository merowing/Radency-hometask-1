import { getDatabase, setArchiveItem, removeDatabaseItem } from './lib/database.js';
import { createTable } from './lib/createTable.js';
import createArchive from './lib/createArchive.js';
import getDate from './lib/getDate.js';

import { modalWindow, bg, modalNoteButton } from './modalWindow.js';
import { getIds, setIds } from './lib/rowId.js';
import  { getTableElems, removeTableElement } from './lib/tableElems.js';
import shortTextRow from './lib/shortTextRow.js';

let mainBlock = document.querySelector('.mainContent');

// fill content
createTable(getDatabase());
createArchive();

let mainContentElems = getTableElems();
for(let n = 0; n < mainContentElems.length; n++) {
    shortTextRow(n);
}

// addNote block
let createNote = document.querySelector('button.createNote');
createNote.addEventListener('click', () => {
    clearModalWindow();
    
    bg.classList.remove('hidden');
    modalWindow.classList.remove('hidden');
    modalNoteButton.innerText = 'Add Note';
});

function tagMainContent(elem) {
    if(elem.parentElement.getAttribute('class') !== 'mainContent') {
        return tagMainContent(elem.parentElement);
    }else {
        return elem;
    }
}

function clearModalWindow() {
    modalNoteButton.removeAttribute("edit");

    let elems = modalWindow.querySelectorAll('div > [name]');
    for(let i = 0; i < elems.length; i++) {
        switch(elems[i].tagName) {
            case 'TEXTAREA':
                elems[i].innerText = '';
                elems[i].value = '';
                break;
            case 'SELECT':
                elems[i].selectedIndex = 0;
                break;
            default:
                elems[i].value = '';
        }
    }
}

mainBlock.addEventListener('click', e => {
    
    let elem = tagMainContent(e.target);
    mainContentElems = getTableElems();
    let id = mainContentElems.indexOf(elem);

    setIds([+elem.getAttribute('id'), id]);
    let { databaseRowId } = getIds();

    let editButtons = mainContentElems[id].querySelectorAll('.editButtons li');
    
    let editIndex = Array.from(editButtons).indexOf(e.target);

    // edit
    if(e.target.tagName === 'LI' && editIndex === 0) {
        modalNoteButton.setAttribute("edit", true);
        modalWindow.classList.remove('hidden');
        bg.classList.remove('hidden');
        modalNoteButton.innerText = 'Edit Note';

        let {name, category, content, date} = getDatabase(databaseRowId);

        let noteName = document.querySelector('#noteName');
        let noteCategory = document.querySelector('#noteCategory');
        let noteDescription = document.querySelector('#noteDescription');
        let noteDateFrom = document.querySelector('#noteDateFrom');
        let noteDateTo = document.querySelector('#noteDateTo');
        
        noteName.value = name;
        noteCategory.selectedIndex = category;
        noteDescription.value = content;

        noteDateFrom.value = '';
        noteDateTo.value = '';
        if(date.length > 0) {
            let dateArr = getDate(date);
            noteDateFrom.value = dateArr[0];
            if(dateArr.length === 2) noteDateTo.value = dateArr[1];
        }
    }

    // archive
    if(e.target.tagName === 'LI' && editIndex === 1) {
        setArchiveItem(databaseRowId);
        elem.parentElement.removeChild(elem);
        removeTableElement(id);
        createArchive();
    }

    // delete
    if(e.target.tagName === 'LI' && editIndex === 2) {
        elem.parentElement.removeChild(elem);
        removeTableElement(id);
        removeDatabaseItem(databaseRowId);
        createArchive();
    }

});
