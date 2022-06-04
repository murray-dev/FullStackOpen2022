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

  const hookGetCountries = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data))
  }

  const showCountry = (countryName) => {
    setFilter(countryName)
  }

  useEffect(hookGetCountries, [])

  return (
    <div>
      <CountryFilter filter={filter} setFilter={setFilter} />
      <CountryList countries={filteredCountries} showCountry={showCountry} />
      <CountryDetails countries={filteredCountries} />
    </div>
  );
}

export default App;
