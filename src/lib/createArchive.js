import getCategory from "./getCategory.js";
import getStatistics from "./getStatistics.js";

function archiveHtmlCode([category, active, archived]) {
    let categoryParams = getCategory(category);
    return `
            <div>
                <ul>
                    <li>
                        <div class="imageCategory" style="background-color:${categoryParams.color}">${categoryParams.name[0]}</div>
                    </li>
                    <li><span>${categoryParams.name}</span></li>
                    <li><span>${active}</span></li>
                    <li><span>${archived}</span></li>
                </ul>
            </div>
    `;
}

export default function() {
    let archiveBlock = document.querySelector('.mainArchive');
    let archiveButton = document.querySelector('.showArchivedNotes');
    //archiveButton.classList.remove('arc');
    archiveButton.classList.remove('show');
    archiveButton.innerText = 'Show archived notes';

    archiveBlock.innerHTML = '';
    let statistics = getStatistics();
    
    let haveArchives = Object.keys(statistics).some(a => statistics[a][2] !== 0);
    
    if(haveArchives) {
        archiveButton.classList.add('show');
        //archiveButton.classList.add('arc');
        if(archiveButton.classList.contains('arc')) archiveButton.innerText = 'Hide archived notes';
    }else {
        archiveButton.classList.remove('arc');
    }

    let fragmentArchive = document.createDocumentFragment();
    for(let i = 0; i < 3; i++) {
        if(!statistics[i]) continue;
        let divArchive = document.createElement('div');
        divArchive.innerHTML = archiveHtmlCode(statistics[i]);
        fragmentArchive.appendChild(divArchive);
    }
    archiveBlock.appendChild(fragmentArchive);
}
