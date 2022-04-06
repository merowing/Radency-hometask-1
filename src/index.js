import maxLetters from './lib/maxLetters.js';
import { getData, setData } from './lib/data.js';
import getStatistics from './lib/getStatistics.js';
import getCategory from './lib/getCategory.js';
import contentRow from './lib/contentRow.js';
import archiveRow from './lib/archiveRow.js';

let mainBlock = document.querySelector('.mainContent');
let archiveBlock = document.querySelector('.mainArchive');

// fill content
mainBlock.innerHTML = '';
let data = getData();
let fragment = document.createDocumentFragment();
let fragmentArchive = document.createDocumentFragment();
for(let i = 0; i < data.length; i++) {
    if(data[i].archived) continue;

    let elemDiv = document.createElement('div');
    elemDiv.innerHTML = contentRow(data[i]);
        fragment.appendChild(elemDiv);
}
mainBlock.appendChild(fragment);

archiveBlock.innerHTML = '';
let statistics = getStatistics();

for(let i = 0; i < 3; i++) {
    if(!statistics[i]) continue;
    let divArchive = document.createElement('div');
    divArchive.innerHTML = archiveRow(statistics[i]);
    fragmentArchive.appendChild(divArchive);
}
archiveBlock.appendChild(fragmentArchive);


let mainContent = mainBlock.querySelectorAll(':scope > div');
let firstContentItems = mainContent[0].querySelectorAll('span');

let ids = [0,2,3]; // in which columns text should be shorter
let letterLen = maxLetters(ids.map(el => firstContentItems[el]));

for(let n = 0; n < mainContent.length; n++) {
    for(let i = 0; i < letterLen.length; i++) {
        
        let item = mainContent[n].querySelectorAll('span')[ids[i]];
        if(letterLen[i]) {
            let itemText = item.innerText;
            let str = '';
            for(let j = 0; j < letterLen[i] - 4; j++) {
                str += itemText[j];
            }
            item.innerText = str + '...';
        }
    }
}

// addNote block
let modalWindow = document.querySelector('.addNoteModal');
let noteButton = document.querySelector('#noteButton > button');

let bg = document.querySelector('.background');
let createNote = document.querySelector('button.createNote');
createNote.addEventListener('click', () => {
    bg.classList.remove('hidden');
    modalWindow.classList.remove('hidden');
    noteButton.innerText = 'Add Note';
});

let closeNote = document.querySelector('button.noteClose');
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

function tagMainContent(elem) {
    if(elem.parentElement.getAttribute('class') !== 'mainContent') {
        return tagMainContent(elem.parentElement);
    }else {
        return elem;
    }
}

mainBlock.addEventListener('click', e => {
    let elem = tagMainContent(e.target);
    
    let id = [].concat(...mainContent).indexOf(elem);

    let editButtons = mainContent[id].querySelectorAll('.editButtons li');

    let editIndex = Array.from(editButtons).indexOf(e.target);
    
    // edit
    if(e.target.tagName === 'LI' && editIndex === 0) {
        modalWindow.classList.remove('hidden');
        bg.classList.remove('hidden');
        noteButton.innerText = 'Edit Note';
    }

    // archive
    if(e.target.tagName === 'LI' && editIndex === 1) {
        setArchive(id);
    }

    // delete
    if(e.target.tagName === 'LI' && editIndex === 2) {
        deleteRow
    }

});
