module.exports = Object.freeze({
    // ALBUMS
    ADD_ALBUM : 'INSERT INTO albums (title, release_date, `description`, label_id) VALUES (?,?,?,?)',
    GET_ALL_ALBUMS : 'SELECT * FROM albums',
    DELETE_ALBUM_BY_ID : 'DELETE FROM albums WHERE id=?',
    UPDATE_ALBUM : 'UPDATE albums SET title=?, description=? WHERE id=?',
    GET_ALBUMS_BY_LABEL_ID :'SELECT * FROM albums WHERE label_id=?'
});