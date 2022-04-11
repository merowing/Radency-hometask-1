export default function() {
    let elemDiv = document.createElement('div');
    let main = document.querySelector('.mainContent');
    
    elemDiv.innerText = 'List of notes is empty';
    elemDiv.setAttribute('class', 'empty');
    
    main.appendChild(elemDiv);
    main.style.textAlign = 'center';
}