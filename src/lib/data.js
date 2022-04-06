let db = [
    {
        name: 'Name of category',
        created: 'April 04, 2022',
        category: 1,
        content: 'Content test',
        dates: '3/5/2022, 5/5/2022',
        archived: false,
    },
    {
        name: 'Name of category 2',
        created: 'April 05, 2022',
        category: 2,
        content: 'Content test 2',
        dates: '',
        archived: true,
    },
    {
        name: 'Name of category 2',
        created: 'April 05, 2022',
        category: 2,
        content: 'Content test 2',
        dates: '',
        archived: false,
    },
];

function getData(id = null) {
    if(id === null) return db;
    return db[id];
}
function setData({name, created, category, content, dates, archive}) {
    db.push({
        name,
        created,
        category,
        content,
        dates,
        archive,
    });
}
function setArchive(id) {
    db[id].archive = true;
}

export { getData, setData, setArchive };