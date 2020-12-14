module.exports = Object.freeze({
    // ALBUMS
    ADD_ALBUM : 'INSERT INTO album (title, release_date, label_id) VALUES (?,?,?)',
    GET_ALL_ALBUMS : 'SELECT * FROM album',
    DELETE_ALBUM_BY_ID : 'DELETE FROM album WHERE id=?',
    UPDATE_ALBUM : 'UPDATE album SET title=?, description=? WHERE id=?',
    GET_ALBUMS_BY_LABEL_ID :'SELECT * FROM albums WHERE label_id=?'
});