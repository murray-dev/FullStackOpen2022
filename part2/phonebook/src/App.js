import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)

  const addContact = (event) => {
    event.preventDefault()

    if (persons.map((x) => x.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }

    const newContact = {
      name: newName
    }
    setPersons(persons.concat(newContact))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((x) => <p key={x.name}>{x.name}</p>)}
    </div>
  )
}

export default App