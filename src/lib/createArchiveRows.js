import getCategory from "./getCategory.js";
import getStatistics from "./getStatistics.js";

function archiveHtmlCode([category, active, archived]) {
    return `
            <div>
                <ul>
                    <li>
                        <div class="imageCategory">A</div>
                    </li>
                    <li><span>${getCategory(category)}</span></li>
                    <li><span>${active}</span></li>
                    <li><span>${archived}</span></li>
                </ul>
            </div>
    `;
}

export default function() {
    let archiveBlock = document.querySelector('.mainArchive');
    archiveBlock.innerHTML = '';
    let statistics = getStatistics();
console.log(statistics);
    let fragmentArchive = document.createDocumentFragment();
    for(let i = 0; i < 3; i++) {
        if(!statistics[i]) continue;
        let divArchive = document.createElement('div');
        divArchive.innerHTML = archiveHtmlCode(statistics[i]);
        fragmentArchive.appendChild(divArchive);
    }
    archiveBlock.appendChild(fragmentArchive);
}
