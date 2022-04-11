import getCategory from "./getCategory.js";
import { getDateFromContent } from "./getDate.js";

function htmlCode({ name, created, category, date, content}) {
    let categoryParams = getCategory(category);
    let categoryStyleStr = `background-color: ${categoryParams.color}`;

    date = (date.length) ? date.join(', ') : '';
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
    if(index !== null && data.archived) {
        elemDiv.setAttribute('class', 'archived');
    }
    data['date'] = getDateFromContent(data.content);
    elemDiv.innerHTML = htmlCode(data);

    if(index === null) {
        main.appendChild(elemDiv);
    }else {
        let elemBefore = main.querySelectorAll(':scope > div')[index];
        main.insertBefore(elemDiv, elemBefore);
    }
}

function createTable(data) {
    let mainBlock = document.querySelector('.mainContent');

    mainBlock.innerHTML = '';
    
    let empties = 0;
    let fragment = data.reduce((prev, current) => {
        if(current.archived) {
            empties++;
            return prev;
        }

        let elemDiv = document.createElement('div');
        elemDiv.setAttribute('id', current.id);
        current['date'] = getDateFromContent(current.content);
        elemDiv.innerHTML = htmlCode(current);
        prev.appendChild(elemDiv);

        return prev;
    }, document.createDocumentFragment());

    if(data.length === empties) {
        emptyTableMessage();
    }

    mainBlock.appendChild(fragment);
}

export { addNewRow, createTable };
