module.exports = Object.freeze({
    // GROUPS_LABELS
    ADD_GROUPS_LABELS : 'INSERT INTO groups_labels (groups_id, labels_id) VALUES (?,?)',
    DELETE_GROUPS_LABELS_BY_PK : 'DELETE FROM groups_labels WHERE groups_id=? AND labels_id=?',
    GET_GROUPS_ID_BY_LABELS_ID :'SELECT groups_id FROM groups_labels WHERE labels_id=?',
    GET_LABELS_ID_BY_GROUPS_ID :'SELECT labels_id FROM groups_labels WHERE groups_id=?'

});