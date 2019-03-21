import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'

const Add = (props) => {
    return (
        <div>
            <h2 className="display-4">Lisää uusi</h2>

            <form className="col-md-8 my-md-3">
                <div className="form-group my-md-2">
                    <label htmlFor="nameField">Nimi:</label>
                    <input type="text" id="nameField" className="form-control" value={props.valueName} onChange={props.onChangeName} />

                    <label htmlFor="numberField">Puhelinnumero:</label>
                    <input type="text" id="numberField" className="form-control" value={props.valueNumber} onChange={props.onChangeNumber} />
                </div>

                <div className="my-md-2">
                    <button className="btn btn-primary" type="submit" onClick={props.onClick}>lisää</button>
                </div>
            </form>
        </div>
    )
}

export default Add