let listOfCategories = ['Idea', 'Random Thought', 'Task'];
export default function(ind = null) {
    let arr = (ind === null) ? listOfCategories : listOfCategories[ind];
    return arr;
}