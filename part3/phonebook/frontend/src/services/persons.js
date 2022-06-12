import axio from "axios";

const getAll = () =>
    axio
        .get(`api/persons`)
        .then((response) => response.data)

const add = (newContact) =>
    axio
        .post(`api/persons`, newContact)
        .then(response => response.data)

const remove = (id) =>
    axio
        .delete(`api/persons/${id}`)

const update = (id, contact) =>
    axio
        .put(`api/persons/${id}`, contact)
        .then(response => response.data)
        
const exports = { getAll, add, remove, update }
export default exports
