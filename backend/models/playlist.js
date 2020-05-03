module.exports = Object.freeze({
    // PLAYLISTS
    ADD_PLAYLIST : 'INSERT INTO playlist (title, author_id) VALUES (?,?)',
    GET_ALL_PLAYLISTS : 'SELECT * FROM playlist',
    DELETE_PLAYLIST_BY_ID : 'DELETE FROM playlist WHERE id=?',
    UPDATE_PLAYLIST : 'UPDATE playlist SET title=? WHERE id=?'

});