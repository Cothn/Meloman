

module.exports = Object.freeze({
    // USER_ROLES
    ADD_USER_ROLE : 'INSERT INTO user_roles (title) VALUES (?)',
    GET_ALL_USER_ROLES : 'SELECT * FROM user_roles',
    DELETE_USER_ROLE_BY_ID : 'DELETE FROM user_roles WHERE id=?',
    UPDATE_USER_ROLE : 'UPDATE user_roles SET title=?  WHERE id=?',
    GET_USER_ROLE_BY_ID :'SELECT * FROM user_roles WHERE id=?',
    GET_USER_ROLE_BY_TITLE :'SELECT * FROM user_roles WHERE title=?',

});
