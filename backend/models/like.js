module.exports = Object.freeze({
    // LIKES
    ADD_LIKE : 'INSERT INTO likes (user_id, post_id) VALUES (?,?)',
    DELETE_LIKE_BY_PK : 'DELETE FROM likes WHERE user_id=? AND post_id=?',
    GET_USERS_ID_BY_POST_ID :'SELECT user_id FROM likes WHERE post_id=?'

});