import getCategory from "./getCategory.js";

export default function({name, created, category, content, dates}) {
return `
        <ul>
            <li>
                <div class="imageCategory">A</div>
            </li>
            <li><span>${name}</span></li>
            <li><span>${created}</span></li>
            <li><span>${getCategory(category)}</span></li>
            <li><span>${content}</span></li>
            <li><span>${dates}</span></li>
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
