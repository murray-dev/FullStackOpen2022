import axios from "axios";
import { useEffect, useState } from "react";

import CountryFilter from './components/CountryFilter'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const filteredCountries = countries.filter(
    c => c.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  const maxCountries = 10
  const showCountryDetails = filteredCountries.length === 1
  const showCountryList =
    filteredCountries.length > 1 && filteredCountries.length <= maxCountries

  const handleShowCountry = (countryName) => setFilter(countryName)

  const hookGetCountries = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data))
  }

  useEffect(hookGetCountries, [])

  return (
    <div>
      <CountryFilter filter={filter} setFilter={setFilter} />
      {showCountryList &&
        <CountryList
          countries={filteredCountries}
          handleShowCountry={handleShowCountry}
        />}
      {filteredCountries.length > maxCountries &&
        <p>Too many matches, specify another filter</p>}
      {showCountryDetails &&
        <CountryDetails country={filteredCountries[0]} />}
    </div>
  );
}

export default App;
