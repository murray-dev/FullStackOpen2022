const CountryList = ({ countries, showCountry }) => {

  if (countries.length === 1) {
    return <></>
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  return (
    <>
      {countries.map((c, i) =>
        <p key={i}>
          {c.name.common}
          <button onClick={() => showCountry(c.name.common)}>show</button>
        </p>
      )}
    </>
  )
}

export default CountryList
