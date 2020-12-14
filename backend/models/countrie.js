

module.exports = Object.freeze({
    // COUNTRIES
    ADD_COUNTRIE : 'INSERT INTO countrie (title) VALUES (?)',
    GET_ALL_COUNTRIES : 'SELECT * FROM countries',
    DELETE_COUNTRIE_BY_ID : 'DELETE FROM countries WHERE id=?',
    UPDATE_COUNTRIE : 'UPDATE countries SET title=?  WHERE id=?',
    GET_COUNTRIE_BY_ID :'SELECT * FROM countries WHERE id=?',
    GET_COUNTRIE_BY_TITLE :'SELECT * FROM countries WHERE title=?',

});
