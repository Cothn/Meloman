module.exports = Object.freeze({
    // ALBUMS_GROUPS
    ADD_ALBUMS_GROUPS : 'INSERT INTO albums_groups (albums_id, groups_id) VALUES (?,?)',
    DELETE_ALBUMS_GROUPS_BY_PK : 'DELETE FROM albums_groups WHERE albums_id=? AND groups_id=?',
    GET_ALBUMS_ID_BY_GROUPS_ID :'SELECT albums_id FROM albums_groups WHERE groups_id=?',
    GET_GROUPS_ID_BY_ALBUMS_ID :'SELECT groups_id FROM albums_groups WHERE albums_id=?'

});