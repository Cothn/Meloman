

module.exports = Object.freeze({
    // PERSONS
    ADD_PERSON : 'INSERT INTO persons (name, surname, birth_date, die_date, biography, countrie_id) VALUES (?,?,?,?,?,?)',
    GET_ALL_PERSONS : 'SELECT id, name, surname, nickname, birth_date, die_date, biography, countrie_id FROM persons',
    DELETE_PERSON_BY_ID : 'DELETE FROM persons WHERE id=?',
    UPDATE_PERSON : 'UPDATE persons SET name=?, surname=?, nickname=?, birth_date=?, die_date=?, biography=?, countrie_id=? WHERE id=?',
    GET_PERSON_BY_ID :'SELECT * FROM persons WHERE id=?',
    GET_PERSONS_BY_COUNTRIE_ID :'SELECT * FROM persons WHERE countrie_id=?'

});
