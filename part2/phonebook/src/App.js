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

  const displayMessage = (message, messageType) => {
    setMessage({message, messageType})
    setTimeout(() => setMessage(null), 3000)
  }

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
        displayMessage(`Added ${addedContact.name}`, 'confirm')
      })

  const removeContact = (person) =>
    personsService
      .remove(person.id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== person.id))
        displayMessage(`Removed ${person.name}`, 'confirm')
      })
      .catch((error) => {
        displayMessage(`'${person.name}' does not exist on server`,
          'error')
        setPersons(persons.filter(p => p.id !== person.id))
      })


  const updateContact = (newPerson) => {

    const person = persons.find(p => p.name === newPerson.name)
    const changedPerson = { ...person, 'number': newPerson.number }

    return personsService
      .update(changedPerson.id, changedPerson)
      .then(changedPerson => {
        setPersons(persons.map(p =>
          p.id !== changedPerson.id ? p : changedPerson))
        displayMessage(`Updated info for ${changedPerson.name}`, 'confirm')
      })
      .catch(error => {
        displayMessage(`${changedPerson.name} does not exist on server`,
          'error')
        removeContact(changedPerson)
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
