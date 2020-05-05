

module.exports = Object.freeze({
    // USERS
    ADD_USER : 'INSERT INTO users (nickname, email, password, salt) VALUES (?,?,?,?)',
    GET_ALL_USERS : 'SELECT id, name, surname, nickname, email, music_avatar_id FROM users',
    DELETE_USER_BY_ID : 'DELETE FROM users WHERE id=?',
    UPDATE_USER : 'UPDATE users SET name=?, surname=?, nickname=?, email=?, password=?, salt=?, music_avatar_id=?   WHERE id=?',
    GET_USER_BY_ID :'SELECT * FROM users WHERE id=?',
    GET_USER_BY_EMAIL :'SELECT * FROM users WHERE email=?',
    GET_USER_BY_ROLE_ID :'SELECT * FROM users WHERE role_id=?'

});
