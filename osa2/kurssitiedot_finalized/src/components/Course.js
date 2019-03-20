import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'

const Header = (props) => {
    return (
        <div className="row my-md-2">
            <h2>{props.course.name}</h2>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
           {props.part} {props.exercise}
        </div>
    )
}

const Content = (props) => {

    const mapParts = () => props.parts.map(part =>
        <Part part={part.name} exercise={part.exercises} key={part.id}/>
    )

    return (
        <div>
            {mapParts()}
        </div>
    )
}

const Total = (props) => {
   /* const parts = props.course.map(part =>
        
    )
    */
    let totalNum = props.parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)

    return (
        <div>
            <p>Yhteensä {totalNum} tehtävää</p>
        </div>
    )
}

const Course = (props) => {

    return (
        <div className="col my-md-3">
            <Header course={props.course} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />   
        </div>
        
    )
}

export default Course