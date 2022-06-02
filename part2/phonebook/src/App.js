import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

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

  const renderFilteredNumbers = () => (
    persons
      .filter((x) => x.name.toLowerCase().includes(filterName.toLowerCase()))
      .map(x => <p key={x.name}>{x.name} {x.numer}</p>)
  )

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with
      <input value={filterName} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {renderFilteredNumbers()}
    </div>
  )
}

export default App