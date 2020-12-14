

module.exports = Object.freeze({
    // GROUPS
    ADD_GROUP : 'INSERT INTO groups (title, birth_date, die_date, countrie_id) VALUES (?,?,?)',
    GET_ALL_GROUPS : 'SELECT title, birth_date, die_date, countrie_id FROM groups',
    DELETE_GROUP_BY_ID : 'DELETE FROM groups WHERE id=?',
    UPDATE_GROUP : 'UPDATE groups SET name=?, surname=?, nickname=?, birth_date=?, die_date=?, biography=?, countrie_id=? WHERE id=?',
    GET_GROUP_BY_ID :'SELECT * FROM groups WHERE id=?',
    GET_GROUPS_BY_COUNTRIE_ID :'SELECT * FROM groups WHERE countrie_id=?'

});
