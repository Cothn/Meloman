module.exports = Object.freeze({
    // POSTS
    ADD_POST : 'INSERT INTO posts (text, author_id, playlist_id) VALUES (?,?,?)',
    GET_ALL_POSTS : 'SELECT * FROM posts',
    DELETE_POST_BY_ID : 'DELETE FROM posts WHERE id=?',
    UPDATE_POST : 'UPDATE posts SET text=? WHERE id=?',
    GET_POST_BY_ID :'SELECT * FROM posts WHERE id=?',
    GET_POSTS_BY_AUTHOR_ID :'SELECT * FROM posts WHERE author_id=?',
    GET_POSTS_BY_PLAYLIST_ID :'SELECT * FROM posts WHERE playlist_id=?'

});