

module.exports = Object.freeze({
    // PERSON_ROLES
    ADD_PERSON_ROLE : 'INSERT INTO person_role (title) VALUES (?)',
    GET_ALL_PERSON_ROLES : 'SELECT * FROM person_roles',
    DELETE_PERSON_ROLE_BY_ID : 'DELETE FROM person_roles WHERE id=?',
    UPDATE_PERSON_ROLE : 'UPDATE person_roles SET title=?  WHERE id=?',
    GET_PERSON_ROLE_BY_ID :'SELECT * FROM person_roles WHERE id=?',
    GET_PERSON_ROLE_BY_TITLE :'SELECT * FROM person_roles WHERE title=?',

});
