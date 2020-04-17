module.exports = Object.freeze({
    // PLAYLIST_TRACKS
    ADD_PLAYLIST_TRACK : 'INSERT INTO playlist_track (playlist_id, track_id) VALUES (?,?)',
    DELETE_PLAYLIST_TRACK_BY_PK : 'DELETE FROM playlist_track WHERE playlist_id=? AND track_id=?',
    GET_TRACKS_ID_BY_PLAYLIST_ID :'SELECT track_id FROM playlist_track WHERE playlist_id=?',
    GET_PLAYLISTS_ID_BY_TRACK_ID :'SELECT playlist_id FROM playlist_track WHERE track_id=?'

});