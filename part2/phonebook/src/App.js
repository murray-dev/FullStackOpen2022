import { useEffect, useState } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const hookGetPersons = () => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data))
  }

  useEffect(hookGetPersons, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilterName(event.target.value)

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const addContact = (event) => {
    event.preventDefault()

    if (persons.map((x) => x.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      clearForm()
      return
    }

    const newContact = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(newContact))
    clearForm()
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterName={filterName}
        handleFilterChange={handleFilterChange}
      />

      <h2>add a new</h2>
      <PersonForm
        addContact={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons
          .filter((x) => x.name.toLowerCase().includes(filterName.toLowerCase()))} />
    </div>
  )
}

export default App