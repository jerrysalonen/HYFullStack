import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Search from './components/Search'
import Add from './components/Add'
import List from './components/List'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '045-123456'
    },
    {
      name: 'Jerry Salonen',
      number: '040-222222'
    },
    {
      name: 'Esko Esimerkki',
      number: '888888888'
    }
  ])  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')
  const [showContacts, setShowContacts] = useState(true)

  const nameListener = (event) => {
    setNewName(event.target.value)
  }

  const numberListener = (event) => {
    setNewNumber(event.target.value)
  }

  const nameSearchListener = (event) => {
    setNameSearch(event.target.value)
    console.log(nameSearch)
    persons.forEach((person) => {
      if (person.name.search(regex) >= 0) {
        setShowContacts(false)
      } else {
        setShowContacts(true)
      }
    })
  }

  let reg = "^" + nameSearch
  let regex = new RegExp(reg, "ig")
  const contactsToShow = showContacts
    ? persons
    : persons.filter(person => person.name.search(regex) >= 0)

  const addContact = (event) => {
    event.preventDefault()
    let nameExists = false

    persons.forEach((contactTemp) => {
      if (contactTemp.name === newName) {
        nameExists = true
      }
    })

    if (!nameExists) {
      const newContact = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newContact))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} on jo puhelinluettelossa!`)
    }
  }

  const mapNames = () => contactsToShow.map(person =>
    <p key={person.name}>{person.name} {person.number}</p>
  )

  return (
    <div className="container">

      <h2 className="display-3">Puhelinluettelo</h2>

      <Search value={nameSearch} onChange={nameSearchListener} />

      <Add valueName={newName}
          valueNumber={newNumber}
          onChangeName={nameListener}
          onChangeNumber={numberListener} 
          onClick={addContact}
        />

      <List mapNames={mapNames()} />
      
    </div>
  )

}

export default App