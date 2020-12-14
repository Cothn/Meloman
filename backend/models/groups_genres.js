module.exports = Object.freeze({
    // GROUPS_GENRES
    ADD_GROUPS_GENRES : 'INSERT INTO groups_genres (groups_id, genres_id) VALUES ?',
    DELETE_GROUPS_GENRES_BY_GROUP_ID :'DELETE FROM groups_genres WHERE groups_id=?',
    DELETE_GROUPS_GENRES_BY_PK : 'DELETE FROM groups_genres WHERE groups_id=? AND genres_id=?',
    GET_GROUPS_ID_BY_GENRES_ID :'SELECT groups_id FROM groups_genres WHERE genres_id=?',
    GET_GENRES_ID_BY_GROUPS_ID :'SELECT genres_id FROM groups_genres WHERE groups_id=?'

});