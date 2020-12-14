

module.exports = Object.freeze({
    // LANGUAGES
    ADD_LANGUAGE : 'INSERT INTO language (title) VALUES (?)',
    GET_ALL_LANGUAGES : 'SELECT * FROM languages',
    DELETE_LANGUAGE_BY_ID : 'DELETE FROM languages WHERE id=?',
    UPDATE_LANGUAGE : 'UPDATE languages SET title=?  WHERE id=?',
    GET_LANGUAGE_BY_ID :'SELECT * FROM languages WHERE id=?',
    GET_LANGUAGE_BY_TITLE :'SELECT * FROM languages WHERE title=?',

});
