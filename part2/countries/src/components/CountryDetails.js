const CountryDetails = ({ countries }) => {
    if (countries.length !== 1) {
      return <></>
    }
  
    const c = countries[0]
  
    return (
      <>
        <h1>{c.name.common}</h1>
        <p>capital {c.capital[0]}</p>
        <p>area {c.area}</p>
        <h2>languages:</h2>
        <ul>
          {
            Object.keys(c.languages).map(
              key => <li key={key}>{c.languages[key]}</li>
            )
          }
        </ul>
        <p style={{ 
          fontSize: "10rem",
          margin: 0
          }}>{c.flag}</p>
      </>
    )
  }

export default CountryDetails