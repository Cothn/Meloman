module.exports = Object.freeze({
    // SINGLES_PERSONS
    ADD_SINGLES_PERSONS : 'INSERT INTO singles_persons (singles_id, persons_id) VALUES ?',
    DELETE_SINGLES_PERSONS_BY_SINGLE_ID : 'DELETE FROM singles_persons WHERE singles_id=?',
    DELETE_SINGLES_PERSONS_BY_PK : 'DELETE FROM singles_persons WHERE singles_id=? AND persons_id=?',
    GET_SINGLES_ID_BY_PERSONS_ID :'SELECT singles_id FROM singles_persons WHERE persons_id=?',
    GET_PERSONS_ID_BY_SINGLES_ID :'SELECT persons_id FROM singles_persons WHERE singles_id=?'

});