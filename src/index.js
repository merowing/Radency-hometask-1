import maxLetters from './lib/maxLetters.js';
import { getData, setData } from './lib/data.js';

let mainBlock = document.querySelector('.mainContent');

let listOfCategories = ['Idea', 'Random Thought', 'Task'];

// fill content
mainBlock.innerHTML = '';
let data = getData();
let fragment = document.createDocumentFragment();
for(let i = 0; i < data.length; i++) {
    let elemDiv = document.createElement('div');
    elemDiv.innerHTML = `
                    <ul>
                        <li>
                            <div class="imageCategory">A</div>
                        </li>
                        <li><span>${data[i].name}</span></li>
                        <li><span>${data[i].created}</span></li>
                        <li><span>${listOfCategories[data[i].category]}</span></li>
                        <li><span>${data[i].content}</span></li>
                        <li><span>${data[i].dates}</span></li>
                        <li>
                            <div class="editButtons">
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                `;
        fragment.appendChild(elemDiv);
}
mainBlock.appendChild(fragment);


let mainContent = mainBlock.querySelectorAll(':scope > div');
let firstContentItems = mainContent[0].querySelectorAll('span');

let ids = [0,2,3];
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

// edit buttons

// let editButtons = document.querySelectorAll('.editButtons li');

// let edit = editButtons[0];
// edit.addEventListener('click', () => {
//     alert(1);
// });

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
        alert(id);
    }

    // delete
    if(e.target.tagName === 'LI' && editIndex === 2) {
        mainContent[id].parentElement.removeChild(mainContent[id]);
        mainContent = document.querySelectorAll('.mainContent > div');
    }

});


// function editButtonClick(id) {
//     let editButtons = mainContent[id].querySelectorAll('.editButtons li');
//     let edit = editButtons[0];
//     edit.addEventListener('click', e => {
//         e.preventDefault();
//         alert(id);
//         e.stopPropagation();
//     });
// }


//let maxLetters = [];
/*
//let itemHeight = mainContentItems[ids[0]].offsetHeight;
for(let i = 0; i < ids.length; i++) { 
    let itemText = mainContentItems[ids[i]].innerText;
    // let getHeightLine = (item) => {
    //     item.innerText = 'a';
    //     let h = item.offsetHeight;
    //     item.innerText = '';
    //     return h;
    // }
    //let heightLine = getHeightLine(mainContentItems[ids[0]]);

    mainContentItems[ids[i]].style.whiteSpace = 'nowrap';
    let itemWidth = mainContentItems[ids[i]].offsetWidth;
    mainContentItems[ids[i]].removeAttribute('style');

    let lettersLen = itemText.length;
    let textBlockWidth = mainContentItems[ids[i]].parentElement.offsetWidth;
    let maxLetters = Math.floor(textBlockWidth / Math.ceil(itemWidth/lettersLen));

    maxLettersArr[maxLettersArr.length] = maxLetters;
*/
    /*
    if(textBlockWidth < itemWidth) {
        let str = '';
        for(let i = 0; i < maxLetters - 4; i++) {
            str += itemText[i];
        }
        mainContentItems[ids[i]].innerText = str + '...';
    }
    */
//}
//alert(textBlockWidth / ~~(itemWidth/lettersLen));

// let i = 0;
// while(mainContentItems[ids[0]].offsetHeight <= heightLine && i < 10) {
//     mainContentItems[ids[0]].innerText += (itemText[i] === ' ') ? " " : itemText[i];
//     i++;
// }
