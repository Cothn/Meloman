module.exports = Object.freeze({
    // GROUPS_PERSONS
    ADD_GROUPS_PERSONS : 'INSERT INTO groups_persons (groups_id, persons_id, date_in, date_out) VALUES (?,?)',
    UPDATE_GROUPS_PERSONS : 'UPDATE groups_persons SET date_in=?, date_out=?  WHERE groups_id=? AND persons_id=?',
    DELETE_GROUPS_PERSONS_BY_PK : 'DELETE FROM groups_persons WHERE groups_id=? AND persons_id=?',
    GET_GROUPS_ID_BY_PERSONS_ID :'SELECT groups_id FROM groups_persons WHERE persons_id=?',
    GET_PERSONS_ID_BY_GROUPS_ID :'SELECT persons_id FROM groups_persons WHERE groups_id=?'

});