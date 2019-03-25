import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import Country from './components/Country'

const App = () => {
  const [countryInput, setCountryInput] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState(countries)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('data loaded')
        setCountries(response.data)
      })
  }, [])

  const inputHandler = (event) => {
    setCountryInput(event.target.value)
    filter(event.target.value)
  }

  const filter = (filterText) => {
    let filterCountries = countries
    filterCountries = filterCountries.filter((country) => {
      let countryName = country.name.toLowerCase()
      return countryName.indexOf(
        filterText.toLowerCase()) !== -1
    })
    setShowCountries(filterCountries)
  }

  const showList = () => {
    if (showCountries.length <= 10 && showCountries.length > 1) {
      return mapCountries()
    } else if (showCountries.length === 1) {
      return (<Country name={showCountries[0].name}
          capital={showCountries[0].capital}
          population={showCountries[0].population}
          languages={showCountries[0].languages}
          image={showCountries[0].flag} />)
    } else {
      return (<p>Please specify</p>)
    }
  }

  const showButton = (countryName) => {
    setCountryInput(countryName)
    filter(countryName)
  }

  const mapCountries = () =>
    showCountries.map(country =>
      <div className="row" key={country.name}>
        <p key={country.cioc} className="mx-md-3 my-md-2">{country.name}</p>
        <button onClick={() => showButton(country.name)} className="btn btn-primary btn-sm" key={country.alpha2Code}>Show</button>
      </div>
    )

  return (
    <div className="container-fluid">
      <div className="col mx-auto my-md-3" style={{ width: "500px" }}>
        <h1 className="display-3">Country Search</h1>
        <form className="form-group my-md-5">
          <label htmlFor="country-search">Find countries:</label>
          <input className="mx-md-2" id="country-search" value={countryInput} onChange={inputHandler}></input>
        </form>
        {showList()}
      </div>
    </div>
  )

}

export default App;