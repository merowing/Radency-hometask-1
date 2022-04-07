export default function(date) {
    let dateString = date.join(', ');
    if(date.some(a => !a) && date !== []) {
        let p = '';
        if(date[0] === '') p = 'To: ';
        if(date[1] === '') p = 'From: ';
        date = date.filter(a => a);
        dateString = p + date[0];
    }
    return dateString;
}
