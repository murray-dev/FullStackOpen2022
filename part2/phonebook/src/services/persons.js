import axio from "axios";

const getAll = () =>
    axio
        .get(`http://localhost:3001/persons`)
        .then((response) => response.data)

const add = (newContact) =>
    axio
        .post(`http://localhost:3001/persons`, newContact)
        .then(response => response.data)

const remove = (id) =>
    axio
        .delete(`http://localhost:3001/persons/${id}`)

const update = (id, contact) =>
    axio
        .put(`http://localhost:3001/persons/${id}`, contact)
        .then(response => response.data)

export default { getAll, add, remove, update }
