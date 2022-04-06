import getCategory from "./getCategory.js";

export default function([category, active, archived]) {
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