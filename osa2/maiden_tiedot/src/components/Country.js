import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'

const Country = (props) => {

    const altString = `Flag of ${props.name}`
    const url = `https://api.apixu.com/v1/current.json?key=a3e920c75bb04bf4ab4230050192403`
    const [loaded, setLoaded] = useState(false)
    const [weather, setWeather] = useState({})

    useEffect(() => {
        axios
            .get(`${url}&q=${props.capital}`)
            .then(response => {
                console.log('weather data loaded')
                setWeather(response.data)
                setLoaded(true)
            })
    }, [])

    const listWeather = () => {
        if (loaded) {
            return (
                <div>
                    <h3>Weather in {props.capital}</h3>
                    <div className="col">
                        <img src={weather.current.condition.icon} alt=""></img>
                        <p>Temperature: {weather.current.temp_c}&deg;</p>
                        <p>Wind speed and direction: {weather.current.wind_kph} kph, {weather.current.wind_dir}</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div>Loading weather data...</div>
            )
        }
    }

    return (
        <div className="col">
            <h3 className="display-4">{props.name}</h3>
            <div className="col">
                <p>Capital: {props.capital}</p>
                <p>Population: {props.population}</p>
            </div>
            <h3>Languages</h3>
            <div className="col">
                <ul className="list-group list-group-flush list-group-horizontal my-md-3">
                    {props.languages.map(language => <li key={language.iso639_1} className="list-group-item">{language.name}</li>)}
                </ul>
                <img src={props.image} alt={altString} width="200px" className="my-md-3"></img>
            </div>
            {listWeather()}
        </div>
    )
}

export default Country