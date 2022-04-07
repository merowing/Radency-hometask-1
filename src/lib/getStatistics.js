import { getDatabase } from './database.js';
let active = 0;
let archived = 0;

function setStatistics() {
    let data = getDatabase();
    let statistics = {};

    for(let i = 0; i < data.length; i++) {
        let categoryId = data[i].category;
        active = 1;
        archived = 0;
        
        if(!statistics[categoryId]) {
            if(data[i].archived) {
                archived = 1;
                active = 0;
            }
            statistics[categoryId] = [categoryId, active, archived];
        }else {
            if(data[i].archived) {
                statistics[categoryId][2] += 1;
            }else {
                statistics[categoryId][1] += 1;
            }
        }
    }
    return statistics;
}

export default function() {
    return setStatistics();
}
