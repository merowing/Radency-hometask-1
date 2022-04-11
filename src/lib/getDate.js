const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

function getDateNow() {
    let date = new Date();

    let day = date.getDate();
    let month = monthNames[date.getMonth()];
    let year = date.getFullYear();

    if(day < 10) day = '0' + day;

    return `${month} ${day}, ${year}`;
}

function getDateFromContent(content) {
    try {
        if(typeof content !== 'string') throw('Content should be a string!');
        
        return content.match(/(\d{1,2}\/\d{1,2}\/\d{4})/g) || [];
    }catch(error) {
        alert(error);
    }
}

export { getDateNow, getDateFromContent };