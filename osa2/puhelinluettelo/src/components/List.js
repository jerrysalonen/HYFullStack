import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'

const List = (props) => {
    return (
        <div>
            <h2 className="display-4">Numerot</h2>

            <div className="col-sm my-md-3">
                {props.mapNames}
            </div>
        </div>
    )
}

export default List