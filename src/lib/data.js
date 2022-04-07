let db = [
    {
        id: 0,
        name: 'Name of category',
        created: 'April 04, 2022',
        category: 1,
        content: 'Content test',
        date: ['3/5/2022', '5/5/2022'],
        archived: false,
    },
    {
        id: 1,
        name: 'Name of category 2',
        created: 'April 05, 2022',
        category: 2,
        content: 'Content test 2',
        date: [],
        archived: true,
    },
    {
        id: 2,
        name: 'Name of category 3',
        created: 'April 05, 2022',
        category: 2,
        content: 'Content test 3',
        date: [],
        archived: false,
    },
];

function getData(id = null) {
    if(id === -1) return db[db.length-1];
    if(id === null) return db;
    return db[getIndex(id)];
}
function setData({name, created, category, content, date}, id = null, edit = false) {
    id = getIndex(id);
    if(edit) {
        db[id] = {
            ...db[id],
            name: name,
            category: category,
            content: content,
            date: date,
        }
        //console.log(db[id]);
    }else {
        db.push({
            id: db[db.length-1].id + 1,
            name,
            created,
            category,
            content,
            date,
            archived: false,
        });
    }
}
function removeData(id) {
    console.log('db:'+db.length);
    db.splice(getIndex(id), 1);
    console.log('db:'+db.length);
}

function setArchive(id) {
    db[getIndex(id)].archived = true;
}

function getIndex(id) {
    let index = 0;
    for(let i = 0; i < db.length; i++) {
        if(db[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
}


export { getData, setData, setArchive, removeData };