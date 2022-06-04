const CountryList = ({ countries }) => {

    if (countries.length === 1) {
      return <></>
    }
  
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }
  
    return (
      <>
        {countries.map((c, i) => <p key={i}>{c.name.common}</p>)}
      </>
    )
  }

export default CountryList
