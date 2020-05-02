

module.exports = Object.freeze({
    // TRACKS
    ADD_TRACK : 'INSERT INTO track (title, music_url, user_id, genre_id) VALUES (?,?,?,?)',
    GET_ALL_TRACKS : 'SELECT * FROM track',
    DELETE_TRACK_BY_ID : 'DELETE FROM track WHERE id=?',
    UPDATE_TRACK : 'UPDATE track SET title=?, genre_id=?  WHERE id=?',

});
