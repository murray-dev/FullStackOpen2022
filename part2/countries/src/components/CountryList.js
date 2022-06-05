const CountryList = ({ countries, handleShowCountry }) => (
    <>
      {countries.map((c, i) =>
        <p key={i}>
          {c.name.common}
          <button onClick={() => handleShowCountry(c.name.common)}>show</button>
        </p>
      )}
    </>
  )

export default CountryList
