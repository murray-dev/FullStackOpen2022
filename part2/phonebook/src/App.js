import { useEffect, useState } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)

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
        setMessage(`Added ${addedContact.name}`)
        setTimeout(() => setMessage(null), 3000)
      })

  const removeContact = (person) =>
    personsService
      .remove(person.id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== person.id))
        setMessage(`Removed ${person.name}`)
        setTimeout(() => setMessage(null), 3000)
      })
      .catch((error) => {
        error.response.status === 404
          ? persons.filter(p => p.id !== person.id)
          : setMessage(`Error removing contact '${person.name}'`)
        setTimeout(() => setMessage(null), 3000)
      })


  const updateContact = (newPerson) => {

    const person = persons.find(p => p.name === newPerson.name)
    const changedPerson = { ...person, 'number': newPerson.number }

    return personsService
      .update(changedPerson.id, changedPerson)
      .then(changedPerson => {
        setPersons(persons.map(p =>
          p.id !== changedPerson.id ? p : changedPerson))
        setMessage(`Updated info for ${changedPerson.name}`)
        setTimeout(() => setMessage(null), 3000)
      })
  }

  useEffect(hookGetPersons, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        filterName={filterName}
        setFilterName={setFilterName}
      />

      <h2>add a new</h2>
      <PersonForm
        addContact={addContact}
        updateContact={updateContact}
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
