import maxLettersInColumn from './lib/maxLettersInColumn.js';
import { getData, setData, setArchive, removeData } from './lib/data.js';
//import getStatistics from './lib/getStatistics.js';
import getCategory from './lib/getCategory.js';
import { addNewRow, addRows } from './lib/contentRow.js';
import createArchiveRows from './lib/createArchiveRows.js';
import getDate from './lib/getDate.js';
import rowDataUpdate from './lib/rowDataUpdate.js';
//import addContentRow from './lib/addContentRow.js';

let mainBlock = document.querySelector('.mainContent');
//let archiveBlock = document.querySelector('.mainArchive');

//console.log(getDate());

// fill content
addRows(getData());

// function createStatistics() {
//     archiveBlock.innerHTML = '';
//     let statistics = getStatistics();

//     let fragmentArchive = document.createDocumentFragment();
//     for(let i = 0; i < 3; i++) {
//         if(!statistics[i]) continue;
//         let divArchive = document.createElement('div');
//         divArchive.innerHTML = archiveRow(statistics[i]);
//         fragmentArchive.appendChild(divArchive);
//     }
//     archiveBlock.appendChild(fragmentArchive);
// }
// createStatistics();
createArchiveRows();


let mainContent = mainBlock.querySelectorAll(':scope > div');
let mainContentElems = [].concat(...mainContent);
//let firstContentItems = mainContent[0].querySelectorAll('span');

let ids = [0,2,3]; // in which columns text should be shorter
//let letterLen = maxLettersInColumn(ids.map(el => firstContentItems[el]));

for(let n = 0; n < mainContent.length; n++) {
    shortText(n);
}

function shortText(index) {
    console.log(index);
    //mainContent = mainBlock.querySelectorAll(':scope > div');
    if(index === -1) index = mainContentElems.length - 1;
console.log(index);
console.log(mainContent);
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
    clearModalWindow();
    
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
let editId = null;
modalNoteButton.addEventListener('click', () => {
    let elems = modalWindow.querySelectorAll('div > [name]');
    let [name, category, dateFrom, dateTo, description] = [...elems].map(el => el.value);
    //console.log(desription);
    let arrDate = [dateFrom, dateTo];
    //console.log(arrDate);
    arrDate = arrDate.filter(a => a);
    //console.log(arrDate);
    let date = arrDate.length ? getDate(arrDate) : [];

    category = +category;
    if(modalNoteButton.getAttribute('edit')) {
        setData({name, category, content:description, date}, activeId, true); // data, id, edit = true
        //console.log(getData(editId));
        //console.log(getData(editId));
        //console.log(getData().length);
        rowDataUpdate(editId, getData(activeId));
        //console.log(getData(activeId));
        //console.log('activeId' + activeId);
        //console.log('editData: ' + JSON.stringify(getData()));
        //console.log(getData().length);
        console.log(JSON.stringify(getData()));
        shortText(editId);
    }else {
        let created = getDate();
        setData({name, created, category, content:description, date});
        
        //addContentRow(getData(-1));
        addNewRow(getData(-1));
        mainContent = mainBlock.querySelectorAll(':scope > div');
        mainContentElems.push(mainContent[mainContent.length - 1]);

        shortText(-1);
    }
    //alert(JSON.stringify(getData(0)));
    //rowDataUpdate(editId, getData(activeId));

    hideModalWindow();
    createArchiveRows();
});

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

let noteName = document.querySelector('#noteName');
//let noteCategory = document.querySelector('#noteCategory');
let noteDescription = document.querySelector('#noteDescription');
let noteDateFrom = document.querySelector('#noteDateFrom');
let noteDateTo = document.querySelector('#noteDateTo');

// let noteName = document.querySelector('#noteName');
// let noteCategory = document.querySelector('#noteCategory');
// let noteDescription = document.querySelector('#noteDescription');
// let noteDateFrom = document.querySelector('#noteDateFrom');
// let noteDateTo = document.querySelector('#noteDateTo');

// let categories = getCategory();
// let categoryFragment = document.createDocumentFragment();
// for(let i = 0; i < categories.length; i++) {
//     let elemOption = document.createElement('option');
//     elemOption.value = i;
//     elemOption.innerText = categories[i];
//     categoryFragment.appendChild(elemOption);
// }
// noteCategory.appendChild(categoryFragment);

mainBlock.addEventListener('click', e => {
    
    let elem = tagMainContent(e.target);
    
    //let id = [].concat(...mainContent).indexOf(elem);
    console.log(mainContentElems);
    let id = mainContentElems.indexOf(elem);
    editId = id;
    activeId = +elem.getAttribute('id');

    let editButtons = mainContentElems[id].querySelectorAll('.editButtons li');
    
    let editIndex = Array.from(editButtons).indexOf(e.target);

    // edit
    if(e.target.tagName === 'LI' && editIndex === 0) {
        modalNoteButton.setAttribute("edit", true);
        modalWindow.classList.remove('hidden');
        bg.classList.remove('hidden');
        modalNoteButton.innerText = 'Edit Note';

        let {name, category, content, date} = getData(activeId);
        //console.log(name, category, content, dates);
        
        
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
        setArchive(activeId);
        elem.parentElement.removeChild(elem);
        mainContentElems.splice(id, 1);
        //createStatistics();
        createArchiveRows();
    }

    // delete
    if(e.target.tagName === 'LI' && editIndex === 2) {
        //deleteRow
        //alert(id);
        elem.parentElement.removeChild(elem);
        mainContentElems.splice(id, 1);
        alert(activeId);
        removeData(activeId);
        console.log(JSON.stringify(getData()));
        //createStatistics();
        createArchiveRows();
    }

});
