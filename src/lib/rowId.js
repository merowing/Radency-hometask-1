let ids = {
    databaseRowId: null,
    tableId: null,
}
function setIds([databaseRowId, tableId]) {
    ids.databaseRowId = databaseRowId;
    ids.tableId = tableId;
}
function getIds() {
    return ids;
}

export { setIds, getIds }
