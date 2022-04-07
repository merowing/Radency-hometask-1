const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

function getDate(arr = null) {
    if(arr === []) return [];
    if(arr === null) {
        let date = new Date();

        let day = date.getDate();
        let month = monthNames[date.getMonth()];
        let year = date.getFullYear();

        if(day < 10) day = '0' + day;

        return `${month} ${day}, ${year}`;
    }else {
        if(arr.join().indexOf('-') >= 0) {
            return arr.map(el => {
                if(!el) return '';
                let [year, month, day] = el.split('-');
                return `${+day}/${+month}/${year}`;
            });
        }else {
            return arr.map(el => {
                if(!el) return '';
                let [day, month, year] = el.split('/');
                if(day < 10) day = '0' + day;
                if(month < 10) month = '0' + month;
                return `${year}-${month}-${day}`;
            });
        }
    }
}

export default getDate;