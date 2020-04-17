module.exports = Object.freeze({
    // PLAYLISTS
    ADD_PLAYLIST : 'INSERT INTO playlists (title, author_id) VALUES (?,?)',
    GET_ALL_PLAYLISTS : 'SELECT * FROM playlists',
    DELETE_PLAYLIST_BY_ID : 'DELETE FROM playlists WHERE id=?',
    UPDATE_PLAYLIST : 'UPDATE playlists SET text=? WHERE id=?',
    GET_PLAYLIST_BY_ID :'SELECT * FROM playlists WHERE id=?',
    GET_PLAYLISTS_BY_AUTHOR_ID :'SELECT * FROM playlists WHERE author_id=?',
    GET_PLAYLISTS_BY_TITLE :'SELECT * FROM playlists WHERE title=?'

});