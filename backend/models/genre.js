

module.exports = Object.freeze({
    // GENRES
    ADD_GENRE : 'INSERT INTO genres (title) VALUES (?)',
    GET_ALL_GENRES : 'SELECT * FROM genres',
    DELETE_GENRE_BY_ID : 'DELETE FROM genres WHERE id=?',
    UPDATE_GENRE : 'UPDATE genres SET title=?  WHERE id=?',
    GET_GENRE_BY_ID :'SELECT * FROM genres WHERE id=?',
    GET_GENRE_BY_TITLE :'SELECT * FROM genres WHERE title=?',

});
