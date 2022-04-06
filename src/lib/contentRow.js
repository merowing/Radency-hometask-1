import getCategory from "./getCategory.js";

export default function({name, created, category, content, date}) {
    date = date.join(', ');
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
