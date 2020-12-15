module.exports = Object.freeze({
    // SINGLES
    ADD_SINGLE : 'INSERT INTO singles (title, release_date, `description`, label_id, track_id, language_id, groups_id) VALUES (?,?,?,?,?,?,?)',
    GET_ALL_SINGLES : 'SELECT * FROM singles',
    DELETE_SINGLE_BY_ID : 'DELETE FROM singles WHERE id=?',
    UPDATE_SINGLE : 'UPDATE singles SET title=?, `description`=?, groups_id WHERE id=?',
    GET_SINGLES_ID_BY_LABEL_ID :'SELECT * FROM singles WHERE label_id=?',
    GET_SINGLES_ID_BY_GROUP_ID :'SELECT * FROM singles WHERE groups_id=?'
});