import { useState } from "react"

const PersonForm = ({ addContact, updateContact, isContact }) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)
    const handleAddContact = (event) => {
        event.preventDefault()
        const newContact = {
            name: newName,
            number: newNumber,
        }

        if (isContact(newName)) {
            window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
                && updateContact(newContact).then(clearForm())

            clearForm()
            return
        }

        addContact(newContact).then(clearForm())
    }

    const clearForm = () => {
        setNewName('')
        setNewNumber('')
    }

    return (
        <form onSubmit={handleAddContact}>
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
    )
}

export default PersonForm
