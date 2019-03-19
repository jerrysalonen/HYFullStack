import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'

const Statistics = (props) => {
    if (props.all > 0) {
        return (
            <div className="row">
                <div className="col my-md-3">
                    <table className="table">
                        <tbody>
                            <Statistic text="Hyvä" value={props.positive} />
                            <Statistic text="Neutraali" value={props.neutral} />
                            <Statistic text="Huono" value={props.negative} />
                        </tbody>
                    </table>
                </div>
                <div className="col my-md-3">
                    <table className="table">
                        <tbody>
                            <Statistic text="Yhteensä" value={props.all} />
                            <Statistic text="Keskiarvo" value={average(props.positive, props.negative, props.all)} />
                            <Statistic text="Positiivisia" value={props.positive / props.all * 100 + "%"} />
                        </tbody>
                    </table>
                </div>
            </div>
        )
    } else {
        return (
            <div className="row">
                <div className="col my-md-3">
                    <p>Ei yhtään palautetta annettu.</p>
                </div>
            </div>
        )
    }
}

const Button = (props) => {
    return (
        <button onClick={props.handler} className="btn btn-primary mx-md-1">{props.text}</button>
    )
}

const Statistic = (props) => {

    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const average = (positives, negatives, all) => {
    let sum = positives + negatives * -1
    let averageFeedback = sum / all
    return averageFeedback
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handlePositive = () => {
        let newValue = good + 1
        setGood(newValue)
    }

    const handleNeutral = () => {
        let newValue = neutral + 1
        setNeutral(newValue)
    }

    const handleNegative = () => {
        let newValue = bad + 1
        setBad(newValue)
    }

    return (
        <div className="container mx-auto" style={{ width: 600 }}>
            <h1 className="display-2">UNICAFE</h1>
            <h1>Anna palautetta</h1>
            <div className="col my-md-3">
                <Button handler={handlePositive} text="Hyvä" />
                <Button handler={handleNeutral} text="Neutraali" />
                <Button handler={handleNegative} text="Huono" />
            </div>
            <h2>Statistiikkaa</h2>
            <Statistics positive={good} neutral={neutral} negative={bad} all={good + neutral + bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)