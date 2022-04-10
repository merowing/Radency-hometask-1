const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

function getDate() {
    let date = new Date();

    let day = date.getDate();
    let month = monthNames[date.getMonth()];
    let year = date.getFullYear();

    if(day < 10) day = '0' + day;

    return `${month} ${day}, ${year}`;
}

export default getDate;