let listOfCategories = [
    {name:'Idea', color: 'indigo'},
    {name:'Random Thought', color: 'rosybrown'}, 
    {name:'Task', color: 'teal'}
];

function getCategory(ind = null) {
    try {
        if(typeof ind !== 'number' && ind !== null) throw('Index of category should be an integer number!');

        return (ind === null) ? listOfCategories.map(i => i.name) : listOfCategories[ind];
    }catch(error) {
        alert(error);
        return listOfCategories.map(i => i.name);
    }
}
export default getCategory