import { useEffect, useState } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterName, setFilterName] = useState('')

  const filteredPersons =
    persons.filter(
      (x) => x.name.toLowerCase().includes(filterName.toLowerCase()))

  const hookGetPersons = () => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
  }

  const isContact = (name) =>
    persons.map((person) => person.name).includes(name)

  const addContact = (newPerson) =>
    personsService
      .add(newPerson)
      .then(addedContact => {
        setPersons(persons.concat(addedContact))
      })

  const removeContact = (person) =>
    personsService
      .remove(person.id)
      .then(response => setPersons(
        persons.filter(p => p.id !== person.id)
      ))
      .catch((error) => {
        error.response.status === 404
          ? persons.filter(p => p.id !== person.id)
          : alert(`Error removing contact '${person.name}'`)
      })

  useEffect(hookGetPersons, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterName={filterName}
        setFilterName={setFilterName}
      />

      <h2>add a new</h2>
      <PersonForm
        addContact={addContact}
        isContact={isContact}
      />

      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons}
        removePerson={removeContact}
      />
    </div>
  )
}

export default App
