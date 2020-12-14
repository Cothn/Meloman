module.exports = Object.freeze({
    // PERSONS_LANGUAGES
    ADD_PERSONS_LANGUAGES : 'INSERT INTO persons_languages (persons_id, languages_id) VALUES (?,?)',
    DELETE_PERSONS_LANGUAGES_BY_PK : 'DELETE FROM persons_languages WHERE persons_id=? AND languages_id=?',
    GET_PERSONS_ID_BY_LANGUAGES_ID :'SELECT persons_id FROM persons_languages WHERE languages_id=?',
    GET_LANGUAGES_ID_BY_PERSONS_ID :'SELECT languages_id FROM persons_languages WHERE persons_id=?'

});