let db = [
    {
        id: 0,
        name: 'Note 1',
        created: 'April 11, 2022',
        category: 1,
        content: 'Lorem Ipsum is simply dummy text',
        archived: false,
    },
    {
        id: 1,
        name: 'Note 2',
        created: 'April 11, 2022',
        category: 2,
        content: 'I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021',
        archived: true,
    },
    {
        id: 2,
        name: 'Note 3',
        created: 'April 11, 2022',
        category: 2,
        content: 'I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021',
        archived: false,
    },
    {
        id: 3,
        name: 'Note 4',
        created: 'April 11, 2022',
        category: 2,
        content: 'Lorem Ipsum is simply dummy text 4',
        archived: false,
    },
    {
        id: 4,
        name: 'Note 5',
        created: 'April 11, 2022',
        category: 1,
        content: 'Lorem Ipsum is simply dummy text 5',
        archived: false,
    },
    {
        id: 5,
        name: 'Note 6',
        created: 'April 11, 2022',
        category: 1,
        content: 'Content test 6',
        archived: true,
    },
    {
        id: 6,
        name: 'Note 7',
        created: 'April 11, 2022',
        category: 1,
        content: 'Content test 7',
        archived: false,
    },
];

function getDatabase(id = null) {
    if(id === -1) return db[db.length-1];
    if(id === null) return db;
    return db[getIndex(id)];
}
function setDatabaseItem({name, created, category, content, archived}, id = null, edit = false) {
    id = getIndex(id);
    if(edit) {
        db[id] = {
            ...db[id],
            name: name,
            category: category,
            content: content,
            archived: archived,
        }
    }else {
        let dbLen = db.length;
        let lastIndex = dbLen ? db[dbLen-1].id + 1 : dbLen;
        db.push({
            id: lastIndex,
            name,
            created,
            category,
            content,
            archived: false,
        });
    }
}
function removeDatabaseItem(id) {
    id = getIndex(id);
    db.splice(id, 1);
}

function setArchiveItem(id) {
    id = getIndex(id);
    db[id].archived = !db[id].archived;
}
function checkArchiveItem(id) {
    id = getIndex(id);
    return db[id].archived;
}

function getDatabaseArchive() {
    return db.reduce((prev, current, ind) => {
        if(current.archived) {
            prev.push({
                data: current,
                position: ind,
            });
        }
        return prev;
    }, []);
}

function getIndex(id) {
    return db.findIndex(item => item.id === id);
}

export { getDatabase, setDatabaseItem, setArchiveItem, checkArchiveItem, removeDatabaseItem, getDatabaseArchive };