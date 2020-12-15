

module.exports = Object.freeze({
    // GROUPS
    ADD_GROUP : 'INSERT INTO `groups` (title, birth_date, die_date, `description`, countrie_id) VALUES (?,?,?,?,?)',
    GET_ALL_GROUPS : 'SELECT id, title, birth_date, die_date, countrie_id FROM `groups`',
    DELETE_GROUP_BY_ID : 'DELETE FROM `groups` WHERE id=?',
    UPDATE_GROUP : 'UPDATE `groups` SET title=?, birth_date=?, die_date=?, `description`=?, countrie_id=? WHERE id=?',
    GET_GROUP_BY_ID :'SELECT * FROM `groups` WHERE id=?',
    GET_GROUPS_BY_COUNTRIE_ID :'SELECT * FROM `groups` WHERE countrie_id=?'

});
