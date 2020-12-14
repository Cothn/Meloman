module.exports = Object.freeze({
    // ALBUMS_LANGUAGES
    ADD_ALBUMS_LANGUAGES : 'INSERT INTO albums_languages (albums_id, languages_id) VALUES (?,?)',
    DELETE_ALBUMS_LANGUAGES_BY_PK : 'DELETE FROM albums_languages WHERE albums_id=? AND languages_id=?',
    GET_ALBUMS_ID_BY_LANGUAGES_ID :'SELECT albums_id FROM albums_languages WHERE languages_id=?',
    GET_LANGUAGES_ID_BY_ALBUMS_ID :'SELECT languages_id FROM albums_languages WHERE albums_id=?'

});