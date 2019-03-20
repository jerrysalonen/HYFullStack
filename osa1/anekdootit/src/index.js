import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'

const Anecdote = (props) => {

    return (
        <div className="col my-md-3">
            <h1 className="display-3">Anecote of the day</h1>
            <h4>{props.anecdote}</h4>
            <p>Has {props.votes} votes</p>
        </div>
    )
}

const Button = (props) => {

    return (
        <button onClick={props.handler} className="btn btn-primary mx-md-1">{props.text}</button>
    )
}

const MostPopularAnecdote = (props) => {
    let maxVoteIndex = props.votes.indexOf(Math.max(...props.votes))

    return (
        <div className="col my-md-3">
            <h1 className="display-3">Anecote with most votes</h1>
            <h4>{props.anecdotes[maxVoteIndex]}</h4>
            <p>Has {props.votes[maxVoteIndex]} votes</p>
        </div>
    )
}

const App = (props) => {
    const votes = new Array(props.anecdotes.length).fill(0)
    const [selected, setSelected] = useState(0)
    const [vote, setVote] = useState(votes)

    const select = () => {
        let randNum = Math.floor(Math.random() * props.anecdotes.length)
        setSelected(randNum)
    }

    const handleVote = () => {
        let newVote = [...vote]
        newVote[selected] += 1
        setVote(newVote)
    }

    return (
        <div className="container">
            <Anecdote anecdote={props.anecdotes[selected]} votes={vote[selected]} />
            <div className="row my-md-3">
                <Button handler={select} text="Next anectode" />
                <Button handler={handleVote} text="Vote" />
            </div>
            <MostPopularAnecdote anecdotes={props.anecdotes} votes={vote} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)