const Person = ({ name, number }) => <p>{name} {number}</p>

const Persons = ({ persons }) => (
    <>
        {persons.map(p =>
            <Person
                key={p.name}
                name={p.name}
                number={p.number} />
        )}
    </>
)

export default Persons