import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'

const Search = (props) => {
    return (
        <div>
            <h2 className="display-4">Rajaa hakua</h2>

            <form className="col-md-8 my-md-3">
                <div className="form-group my-md-2">
                    <label htmlFor="nameSearch">Rajaa nimen mukaan:</label>
                    <input type="text" id="nameSearch" className="form-control" value={props.value} onChange={props.onChange} />
                </div>
            </form>
        </div>
    )
}

export default Search