module.exports = Object.freeze({
    // ALBUMS_PERSONS
    ADD_ALBUMS_PERSONS : 'INSERT INTO albums_persons (albums_id, persons_id) VALUES ?',
    DELETE_ALBUMS_PERSONS_BY_ALBUM_ID : 'DELETE FROM albums_persons WHERE albums_id=?',
    DELETE_ALBUMS_PERSONS_BY_PK : 'DELETE FROM albums_persons WHERE albums_id=? AND persons_id=?',
    GET_ALBUMS_ID_BY_PERSONS_ID :'SELECT albums_id FROM albums_persons WHERE persons_id=?',
    GET_PERSONS_ID_BY_ALBUMS_ID :'SELECT persons_id FROM albums_persons WHERE albums_id=?'

});