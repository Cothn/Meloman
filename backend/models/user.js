

module.exports = Object.freeze({
    // USERS
    ADD_USER : 'INSERT INTO users (name, surname, nickname, login, password, role_id, music_avatar_id) VALUES (?,?,?,?,?,?,?)',
    GET_ALL_USERS : 'SELECT * FROM users',
    DELETE_USER_BY_ID : 'DELETE FROM users WHERE id=?',
    UPDATE_USER : 'UPDATE users SET name=?, surname=?, nickname=?, login=?, password=?, role_id=?, music_avatar_id=?   WHERE id=?',
    GET_USER_BY_ID :'SELECT * FROM users WHERE id=?'

});
