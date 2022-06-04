import { useState, useEffect } from "react";
import axios from "axios";

const CountryDetails = ({ country }) => {

  const [capitalWeather, setCapitalWeather] = useState({
    'temperature': null,
    'weatherIcon': null,
    'windSpeed': null,
  })

  const name = country.name.common
  const countryCode = country.cca2
  const capital = country.capital[0]
  const area = country.area
  const flag = country.flag
  const languages = country.languages


  const hookGetCapitalWeather = () => {
    const api_key = process.env.REACT_APP_API_KEY
    // request capital coordinates, then weather
    axios
      .get(`https://api.openweathermap.org/geo/1.0/direct?q=${capital},,${countryCode}&limit=1&appid=${api_key}`)
      .then(response => {
        const lat = response.data[0].lat
        const lon = response.data[0].lon

        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
          .then(response => {
            setCapitalWeather({
              'temperature': response.data.main.temp,
              'weatherIcon':
                `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
              'description': response.data.weather[0].description,
              'windSpeed': response.data.wind.speed,
            })
          })
      })
  }

  useEffect(hookGetCapitalWeather, [capital, countryCode])

  return (
    <>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <h2>languages:</h2>
      <ul>
        {
          Object.keys(languages).map(
            key => <li key={key}>{languages[key]}</li>
          )
        }
      </ul>
      <p style={{
        fontSize: "10rem",
        margin: 0
      }}>{flag}</p>
      <h2>Weather in {capital}</h2>
      <p>temperature {capitalWeather.temperature} Celcius</p>
      <img src={capitalWeather.weatherIcon} alt={capitalWeather.description} />
      <p>wind {capitalWeather.windSpeed} m/s</p>
    </>
  )
}

export default CountryDetails
