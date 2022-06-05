const CountryFilter = ({ filter, setFilter }) => (
    <>
      find countries
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
    </>
  )

export default CountryFilter
