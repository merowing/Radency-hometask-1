export default function() {
    let elemDiv = document.createElement('div');
    elemDiv.innerText = 'List of notes is empty';
    document.querySelector('.mainContent').appendChild(elemDiv);
    document.querySelector('.mainContent').style.textAlign = 'center';
}