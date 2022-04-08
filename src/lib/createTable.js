import getCategory from "./getCategory.js";
import dateToString from "./dateToString.js";

function htmlCode({ name, created, category, content, date}) {
    let categoryParams = getCategory(category);
    let categoryStyleStr = `background-color: ${categoryParams.color}`;

    date = dateToString(date);
    return `
            <ul>
                <li>
                    <div class="imageCategory" style="${categoryStyleStr}">${categoryParams.name[0]}</div>
                </li>
                <li><span>${name}</span></li>
                <li><span>${created}</span></li>
                <li><span>${categoryParams.name}</span></li>
                <li><span>${content}</span></li>
                <li><span>${date}</span></li>
                <li>
                    <div class="editButtons">
                        <ul>
                            <li class="editIcon" title="edit"></li>
                            <li class="archiveIcon" title="archive"></li>
                            <li class="deleteIcon" title="delete"></li>
                        </ul>
                    </div>
                </li>
            </ul>
        `;
}

function addNewRow(data, index = null) {
    let main = document.querySelector('.mainContent');
    
    let elemDiv = document.createElement('div');
    elemDiv.setAttribute('id', data.id);
    if(index && data.archived) {
        elemDiv.setAttribute('class', 'archived');
    }
    elemDiv.innerHTML = htmlCode(data);

    if(index === null) {
        main.appendChild(elemDiv);
    }else {
        let elemBefore = main.querySelectorAll(':scope > div')[index];
        main.insertBefore(elemDiv, elemBefore);
    }
}

function removeRow(pos) {
    let elems = document.querySelector('.mainContent').querySelectorAll(':scope > div');
    elems[pos].parentElement.removeChild(elems[pos]);
}

function createTable(data) {
    let mainBlock = document.querySelector('.mainContent');

    mainBlock.innerHTML = '';
    
    let fragment = document.createDocumentFragment();
    
    for(let i = 0; i < data.length; i++) {
        if(data[i].archived) continue;
    
        let elemDiv = document.createElement('div');
        elemDiv.setAttribute('id', data[i].id);
        elemDiv.innerHTML = htmlCode(data[i]);
        fragment.appendChild(elemDiv);
    }

    if(data.length === 0) {
        emptyTableMessage();
    }

    mainBlock.appendChild(fragment);
}

export { addNewRow, removeRow, createTable };
