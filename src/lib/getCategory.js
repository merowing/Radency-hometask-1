let listOfCategories = [
    {name:'Idea', color: 'indigo'},
    {name:'Random Thought', color: 'rosybrown'}, 
    {name:'Task', color: 'teal'}
];

function getCategory(ind = null) {
    return (ind === null) ? listOfCategories.map(i => i.name) : listOfCategories[ind];
}
export default getCategory