import getCategory from "./getCategory.js";
import dateToString from "./dateToString.js";

function htmlCode({ name, created, category, content, date}) {
    date = dateToString(date);
    return `
            <ul>
                <li>
                    <div class="imageCategory">A</div>
                </li>
                <li><span>${name}</span></li>
                <li><span>${created}</span></li>
                <li><span>${getCategory(category)}</span></li>
                <li><span>${content}</span></li>
                <li><span>${date}</span></li>
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
}

function addNewRow(data) {
    let main = document.querySelector('.mainContent');
    
    let elemDiv = document.createElement('div');
    elemDiv.setAttribute('id', data.id);
    elemDiv.innerHTML = htmlCode(data);

    main.appendChild(elemDiv);
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

export { addNewRow, createTable };
