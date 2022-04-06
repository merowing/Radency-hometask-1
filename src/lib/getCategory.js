let listOfCategories = ['Idea', 'Random Thought', 'Task'];
export default function(ind = null) {
    let arr = (!ind) ? listOfCategories : listOfCategories[ind];
    return arr;
}