module.exports = Object.freeze({
    // SINGLES
    ADD_SINGLE : 'INSERT INTO single (title, release_date, label_id, tack_id, language_id, groups_id) VALUES (?,?,?,?,?,?)',
    GET_ALL_SINGLES : 'SELECT * FROM single',
    DELETE_SINGLE_BY_ID : 'DELETE FROM single WHERE id=?',
    UPDATE_SINGLE : 'UPDATE single SET title=?, description=?, groups_id WHERE id=?',
    GET_SINGLES_BY_LABEL_ID :'SELECT * FROM singles WHERE label_id=?',
    GET_SINGLES_BY_GROUP_ID :'SELECT * FROM singles WHERE groups_id=?'
});