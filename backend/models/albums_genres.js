module.exports = Object.freeze({
    // ALBUMS_GENRES
    ADD_ALBUMS_GENRES : 'INSERT INTO albums_genres (albums_id, genres_id) VALUES ?',
    DELETE_ALBUMS_GENRES_BY_ALBUM_ID: 'DELETE FROM albums_genres WHERE albums_id=?',
    DELETE_ALBUMS_GENRES_BY_PK : 'DELETE FROM albums_genres WHERE albums_id=? AND genres_id=?',
    GET_ALBUMS_ID_BY_GENRES_ID :'SELECT albums_id FROM albums_genres WHERE genres_id=?',
    GET_GENRES_ID_BY_ALBUMS_ID :'SELECT genres_id FROM albums_genres WHERE albums_id=?'

});