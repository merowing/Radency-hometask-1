import maxLettersInColumn from './lib/maxLettersInColumn.js';
import { getData, setData, setArchive, removeData } from './lib/data.js';
import getStatistics from './lib/getStatistics.js';
import getCategory from './lib/getCategory.js';
import contentRow from './lib/contentRow.js';
import archiveRow from './lib/archiveRow.js';
import getDate from './lib/getDate.js';
import rowDataUpdate from './lib/rowDataUpdate.js';

let mainBlock = document.querySelector('.mainContent');
let archiveBlock = document.querySelector('.mainArchive');

//console.log(getDate());

// fill content
mainBlock.innerHTML = '';
let data = getData();

let fragment = document.createDocumentFragment();
for(let i = 0; i < data.length; i++) {
    if(data[i].archived) continue;

    let elemDiv = document.createElement('div');
    elemDiv.setAttribute('id', data[i].id);
    elemDiv.innerHTML = contentRow(data[i]);
        fragment.appendChild(elemDiv);
}
mainBlock.appendChild(fragment);

function createStatistics() {
    archiveBlock.innerHTML = '';
    let statistics = getStatistics();
console.log(statistics);
console.log(getData());
    let fragmentArchive = document.createDocumentFragment();
    for(let i = 0; i < 3; i++) {
        if(!statistics[i]) continue;
        let divArchive = document.createElement('div');
        divArchive.innerHTML = archiveRow(statistics[i]);
        fragmentArchive.appendChild(divArchive);
    }
    archiveBlock.appendChild(fragmentArchive);
}
createStatistics();


let mainContent = mainBlock.querySelectorAll(':scope > div');
//let firstContentItems = mainContent[0].querySelectorAll('span');

let ids = [0,2,3]; // in which columns text should be shorter
//let letterLen = maxLettersInColumn(ids.map(el => firstContentItems[el]));

for(let n = 0; n < mainContent.length; n++) {
    shortText(n);
}

function shortText(index) {
    let contentItems = mainContent[index].querySelectorAll('span');    
    let letterLen = maxLettersInColumn(ids.map(el => contentItems[el]));

    for(let i = 0; i < letterLen.length; i++) {
        
        let item = mainContent[index].querySelectorAll('span')[ids[i]];
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
let modalNoteButton = document.querySelector('#noteButton > button');

let bg = document.querySelector('.background');
let createNote = document.querySelector('button.createNote');
createNote.addEventListener('click', () => {
    bg.classList.remove('hidden');
    modalWindow.classList.remove('hidden');
    modalNoteButton.innerText = 'Add Note';
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

let activeId = null;
modalNoteButton.addEventListener('click', () => {
    let elems = modalWindow.querySelectorAll('div > [name]');
    let [name, category, dateFrom, dateTo, description] = [...elems].map(el => el.value);
    
    let arrDate = [dateFrom, dateTo];
    arrDate = arrDate.filter(a => a);
    let date = arrDate.length ? getDate(arrDate) : [];

    setData([name, category, description, date], activeId, true); // data, id, edit = true
    
    //alert(JSON.stringify(getData(0)));
    rowDataUpdate(activeId, getData(activeId));

    hideModalWindow();
    shortText(activeId);
    createStatistics();
});

let noteName = document.querySelector('#noteName');
let noteCategory = document.querySelector('#noteCategory');
let noteDescription = document.querySelector('#noteDescription');
let noteDateFrom = document.querySelector('#noteDateFrom');
let noteDateTo = document.querySelector('#noteDateTo');

let categories = getCategory();
let categoryFragment = document.createDocumentFragment();
for(let i = 0; i < categories.length; i++) {
    let elemOption = document.createElement('option');
    elemOption.value = i;
    elemOption.innerText = categories[i];
    categoryFragment.appendChild(elemOption);
}
noteCategory.appendChild(categoryFragment);

mainBlock.addEventListener('click', e => {
    let elem = tagMainContent(e.target);
    
    let id = [].concat(...mainContent).indexOf(elem);
    activeId = +elem.getAttribute('id');

    let editButtons = mainContent[id].querySelectorAll('.editButtons li');

    let editIndex = Array.from(editButtons).indexOf(e.target);
    
    // edit
    if(e.target.tagName === 'LI' && editIndex === 0) {
        modalWindow.classList.remove('hidden');
        bg.classList.remove('hidden');
        modalNoteButton.innerText = 'Edit Note';

        let {name, category, content, date} = getData(activeId);
        //console.log(name, category, content, dates);
        noteName.value = name;
        noteCategory.selectedIndex = category;
        noteDescription.innerText = content;

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
        setArchive(activeId);
        elem.parentElement.removeChild(elem);
        createStatistics();
    }

    // delete
    if(e.target.tagName === 'LI' && editIndex === 2) {
        //deleteRow
        elem.parentElement.removeChild(elem);
        removeData(activeId);
        createStatistics();
    }

});
