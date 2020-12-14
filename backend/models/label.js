

module.exports = Object.freeze({
    // LABELS
    ADD_LABEL : 'INSERT INTO label (title) VALUES (?)',
    GET_ALL_LABELS : 'SELECT * FROM labels',
    DELETE_LABEL_BY_ID : 'DELETE FROM labels WHERE id=?',
    UPDATE_LABEL : 'UPDATE labels SET title=?  WHERE id=?',
    GET_LABEL_BY_ID :'SELECT * FROM labels WHERE id=?',
    GET_LABEL_BY_TITLE :'SELECT * FROM labels WHERE title=?',

});
