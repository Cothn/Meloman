module.exports = Object.freeze({
    // USER_PLAYLISTS
    ADD_USER_PLAYLIST : 'INSERT INTO users_playlists (user_id, playlist_id) VALUES (?,?)',
    DELETE_USER_PLAYLIST_BY_PK : 'DELETE FROM users_playlists WHERE user_id=? AND playlist_id=?',
    GET_USERS_ID_BY_PLAYLIST_ID :'SELECT user_id FROM users_playlists WHERE playlist_id=?',
    GET_PLAYLISTS_ID_BY_USER_ID :'SELECT playlist_id FROM users_playlists WHERE user_id=?'

});