let db = [
    {
        id: 0,
        name: 'Note 1',
        created: 'April 04, 2022',
        category: 1,
        content: 'Content test',
        date: ['3/5/2022', '5/5/2022'],
        archived: false,
    },
    {
        id: 1,
        name: 'Note 2',
        created: 'April 05, 2022',
        category: 2,
        content: 'Content test 2',
        date: [],
        archived: true,
    },
    {
        id: 2,
        name: 'Note 3',
        created: 'April 05, 2022',
        category: 2,
        content: 'Content test 3',
        date: ['6/5/2022'],
        archived: true,
    },
    {
        id: 3,
        name: 'Note 4',
        created: 'April 05, 2022',
        category: 2,
        content: 'Content test 3',
        date: ['','6/5/2022'],
        archived: false,
    },
    {
        id: 4,
        name: 'Note 5',
        created: 'April 05, 2022',
        category: 1,
        content: 'Content test 3',
        date: [],
        archived: false,
    },
    {
        id: 5,
        name: 'Note 6',
        created: 'April 05, 2022',
        category: 1,
        content: 'Content test 3',
        date: [],
        archived: false,
    },
    {
        id: 6,
        name: 'Note 7',
        created: 'April 05, 2022',
        category: 1,
        content: 'Content test 3',
        date: [],
        archived: false,
    },
];

function getDatabase(id = null) {
    if(id === -1) return db[db.length-1];
    if(id === null) return db;
    return db[getIndex(id)];
}
function setDatabaseItem({name, created, category, content, date}, id = null, edit = false) {
    id = getIndex(id);
    if(edit) {
        db[id] = {
            ...db[id],
            name: name,
            category: category,
            content: content,
            date: date,
        }
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
function removeDatabaseItem(id) {
    db.splice(getIndex(id), 1);
}

function setArchiveItem(id) {
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


export { getDatabase, setDatabaseItem, setArchiveItem, removeDatabaseItem };