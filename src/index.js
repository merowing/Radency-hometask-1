import {
    getDatabase,
    setArchiveItem,
    checkArchiveItem,
    removeDatabaseItem,
    getDatabaseArchive
} from './lib/database.js';
import { addNewRow, createTable } from './lib/createTable.js';
import { modalWindow, bg, modalNoteButton } from './modalWindow.js';
import { getIds, setIds } from './lib/rowId.js';
import  { getTableElems, removeTableElement } from './lib/tableElems.js';
import shortTextRow from './lib/shortTextRow.js';
import emptyTableMessage from './lib/emptyTableMessage.js';
import createArchive from './lib/createArchive.js';

let mainBlock = document.querySelector('.mainContent');
let showArchiveNotesButton = document.querySelector('.showArchivedNotes');

// fill content
let db = getDatabase();
createTable(db);
createArchive();

let mainContentElems = getTableElems();
mainContentElems.forEach((elem, ind) => {
    shortTextRow(ind);
});

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
    
    [...elems].forEach(elem => {
        switch(elem.tagName) {
            case 'TEXTAREA':
                elem.innerText = '';
                elem.value = '';
                break;
            case 'SELECT':
                elem.selectedIndex = 0;
                break;
            default:
                elem.value = '';
        }
    });
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

        let {name, category, content, archived} = getDatabase(databaseRowId);

        let noteName = document.querySelector('#noteName');
        let noteCategory = document.querySelector('#noteCategory');
        let noteDescription = document.querySelector('#noteDescription');

        noteArchive.classList.remove('show');
        if(archived) {
            noteArchive.classList.add('show');
            noteArchive.querySelector('input').value = "1";
        }

        noteName.value = name;
        noteCategory.selectedIndex = category;
        noteDescription.value = content;
        noteArchive.querySelector('input').checked = archived;
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
    try {
        if(!Array.isArray(archiveDb) || !archiveDb.length) throw('Archive database must be an array or empty!');
        if(!archiveDb.every(item => item.hasOwnProperty('data') && item.hasOwnProperty('position'))) {
            throw('Some items of array doesn\'t have property data or position');
        }

        if(!this.classList.contains('arc')) {
            if(getTableElems().length === 0) mainBlock.innerHTML = '';
            archiveDb.forEach(item => {
                let {data, position} = item;
                addNewRow(data, position);
                shortTextRow(position);
            });

            this.innerText = 'Hide archived notes';
            this.classList.add('arc');
        }else {
            let elems = mainBlock.querySelectorAll(':scope > div');
            
            archiveDb.forEach(item => {
                let {position: pos} = item;
                elems[pos].parentElement.removeChild(elems[pos]);
            });

            if(getTableElems().length === 0) {
                emptyTableMessage();
            }

            this.innerText = 'Show archived notes';
            this.classList.remove('arc');
        }
    }catch(error) {
        alert(error);
    }
});