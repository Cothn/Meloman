module.exports = Object.freeze({
    // PERSONS_ROLES
    ADD_PERSONS_ROLES : 'INSERT INTO persons_roles (persons_id, person_roles_id) VALUES (?,?)',
    DELETE_PERSONS_ROLES_BY_PK : 'DELETE FROM persons_roles WHERE persons_id=? AND person_roles_id=?',
    GET_PERSONS_ID_BY_ROLES_ID :'SELECT persons_id FROM persons_roles WHERE person_roles_id=?',
    GET_ROLES_ID_BY_PERSONS_ID :'SELECT person_roles_id FROM persons_roles WHERE persons_id=?'

});