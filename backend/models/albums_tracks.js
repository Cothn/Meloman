module.exports = Object.freeze({
    // ALBUMS_TRACKS
    ADD_ALBUMS_TRACKS : 'INSERT INTO albums_track (albums_id, track_id) VALUES (?,?)',
    DELETE_ALBUMS_TRACKS_BY_ALBUMS_ID: 'DELETE FROM albums_track WHERE albums_id=?',
    GET_ALBUMS_ID_BY_TRACKS_ID :'SELECT albums_id FROM albums_track WHERE track_id=?',
    GET_TRACKS_ID_BY_ALBUMS_ID :'SELECT track_id FROM albums_track WHERE albums_id=?'

});