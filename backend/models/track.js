

module.exports = Object.freeze({
    // TRACKS
    ADD_TRACK : 'INSERT INTO tracks (title, music_url, user_id, genre_id) VALUES (?,?,?,?)',
    GET_ALL_TRACKS : 'SELECT * FROM tracks',
    DELETE_TRACK_BY_ID : 'DELETE FROM tracks WHERE id=?',
    UPDATE_TRACK : 'UPDATE tracks SET title=?, genre_id=?  WHERE id=?',
    GET_TRACK_BY_ID :'SELECT * FROM tracks WHERE id=?',
    GET_TRACKS_BY_USER_ID :'SELECT * FROM tracks WHERE user_id=?',
    GET_TRACKS_BY_GENRE_ID :'SELECT * FROM tracks WHERE genre_id=?',
    GET_TRACKS_BY_TITLE :'SELECT * FROM tracks WHERE title=?'

});
