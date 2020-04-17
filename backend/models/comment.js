
module.exports = Object.freeze({
    // COMMENTS
    ADD_COMMENT : 'INSERT INTO comments (text, user_id, post_id) VALUES (?,?,?)',
    GET_ALL_COMMENTS : 'SELECT * FROM comments',
    DELETE_COMMENT_BY_ID : 'DELETE FROM comments WHERE id=?',
    UPDATE_COMMENT : 'UPDATE comments SET text=? WHERE id=?',
    GET_COMMENT_BY_ID :'SELECT * FROM comments WHERE id=?',
    GET_COMMENTS_BY_USER_ID :'SELECT * FROM comments WHERE user_id=?',
    GET_COMMENTS_BY_POST_ID :'SELECT * FROM comments WHERE post_id=?'

});