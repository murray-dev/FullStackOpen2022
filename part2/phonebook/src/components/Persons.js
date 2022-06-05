const Person = ({ name, number, removePerson }) => {
    const handleDelete = () => {
        if (window.confirm(`Delete '${name}'?`)) {
            removePerson()
        }
    }
    return (
        <p>
            {name} {number}
            <button onClick={handleDelete}>delete</button>
        </p >
    )
}

const Persons = ({ persons, removePerson }) => (
    <>
        {persons.map(p =>
            <Person
                key={p.id}
                name={p.name}
                number={p.number}
                removePerson={() => removePerson(p)}
            />
        )}
    </>
)

export default Persons
