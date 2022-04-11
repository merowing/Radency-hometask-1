import emptyTableMessage from './emptyTableMessage.js';

let mainContentElems = [];
let main = document.querySelector('.mainContent');

let getMainContent = () => main.querySelectorAll(':scope > div:not(.empty)');

function addNewTableElement() {
    if(mainContentElems.length === 0) {
        main.innerHTML = '';
        main.removeAttribute('style');
    }

    let mainContent = getMainContent();
    mainContentElems.push(mainContent[mainContent.length - 1]);
}
function removeTableElement(id) {
    mainContentElems.splice(id, 1);

    if(mainContentElems.length === 0) {
        emptyTableMessage();
    }
}
function getTableElems() {
    mainContentElems = [].concat(...getMainContent());
    
    return mainContentElems;
}
export { getTableElems, removeTableElement, addNewTableElement };