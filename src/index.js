import { getDatabase, setArchiveItem, checkArchiveItem, removeDatabaseItem, getDatabaseArchive } from './lib/database.js';
import { addNewRow, createTable } from './lib/createTable.js';
import createArchive from './lib/createArchive.js';
import getDate from './lib/getDate.js';

import { modalWindow, bg, modalNoteButton } from './modalWindow.js';
import { getIds, setIds } from './lib/rowId.js';
import  { getTableElems, removeTableElement } from './lib/tableElems.js';
import shortTextRow from './lib/shortTextRow.js';

let mainBlock = document.querySelector('.mainContent');
let showArchiveNotesButton = document.querySelector('.showArchivedNotes');

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

let noteArchive = document.querySelector('.checkboxArchived');
function clearModalWindow() {
    modalNoteButton.removeAttribute("edit");
    noteArchive.classList.remove('show');
    noteArchive.querySelector('input').value = "0";

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

        let {name, category, content, date, archived} = getDatabase(databaseRowId);

        let noteName = document.querySelector('#noteName');
        let noteCategory = document.querySelector('#noteCategory');
        let noteDescription = document.querySelector('#noteDescription');
        let noteDateFrom = document.querySelector('#noteDateFrom');
        let noteDateTo = document.querySelector('#noteDateTo');
        
        noteArchive.classList.remove('show');
        if(archived) {
            noteArchive.classList.add('show');
            noteArchive.querySelector('input').value = "1";
        }

        noteName.value = name;
        noteCategory.selectedIndex = category;
        noteDescription.value = content;
        noteArchive.querySelector('input').checked = archived;

        noteDateFrom.value = '';
        noteDateTo.value = '';
        if(date.length > 0) {
            let dateArr = getDate(date);
            noteDateFrom.value = dateArr[0];
            noteDateTo.value = dateArr[1];
        }
    }

    // archive
    if(e.target.tagName === 'LI' && editIndex === 1) {
        if(checkArchiveItem(databaseRowId)) {
            elem.classList.remove('archived');
        }else {
            if(!showArchiveNotesButton.classList.contains('arc')) {
                elem.parentElement.removeChild(elem);
                removeTableElement(id);
            }else {
                elem.classList.add('archived');
            }
        }
        setArchiveItem(databaseRowId);
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

showArchiveNotesButton.addEventListener('click', function() {
    let archiveDb = getDatabaseArchive();
    
    if(!this.classList.contains('arc')) {

        for(let a = 0; a < archiveDb.length; a++) {
            let {data, position: pos} = archiveDb[a];
            addNewRow(data, pos);
            shortTextRow(pos);
        }

        this.innerText = 'Hide archived notes';
        this.classList.add('arc');
    }else {
        let elems = mainBlock.querySelectorAll(':scope > div');
        for(let a = 0; a < archiveDb.length; a++) {
            let {position: pos} = archiveDb[a];
            elems[pos].parentElement.removeChild(elems[pos]);
        }

        this.innerText = 'Show archived notes';
        this.classList.remove('arc');
    }
});