module.exports = Object.freeze({
    // GROUPS_LANGUAGES
    ADD_GROUPS_LANGUAGES : 'INSERT INTO groups_languages (groups_id, languages_id) VALUES ?',
    DELETE_GROUPS_LANGUAGES_BY_GROUP_ID : 'DELETE FROM groups_languages WHERE groups_id=?',
    DELETE_GROUPS_LANGUAGES_BY_PK : 'DELETE FROM groups_languages WHERE groups_id=? AND languages_id=?',
    GET_GROUPS_ID_BY_LANGUAGES_ID :'SELECT groups_id FROM groups_languages WHERE languages_id=?',
    GET_LANGUAGES_ID_BY_GROUPS_ID :'SELECT languages_id FROM groups_languages WHERE groups_id=?'

});