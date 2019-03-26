import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Search from './components/Search'
import Add from './components/Add'
import List from './components/List'
import contactHandler from './services/contactHandler'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')
  const [showContacts, setShowContacts] = useState([])

  useEffect(() => {
    console.log('effect')
    contactHandler.readAll()
      .then(tempPersons => {
        setPersons(tempPersons)
        setShowContacts(tempPersons)
      })
  }, [])

  const nameListener = (event) => {
    setNewName(event.target.value)
  }

  const numberListener = (event) => {
    setNewNumber(event.target.value)
  }

  const nameSearchListener = (event) => {
    setNameSearch(event.target.value)
    filter(event.target.value)
  }

  const filter = (filterText) => {
    let filterPersons = persons
    filterPersons = filterPersons.filter((person) => {
      let personName = person.name.toLowerCase()
      return personName.indexOf(
        filterText.toLowerCase()) !== -1
    })
    if (filterPersons.length === persons.length) {
      setShowContacts(persons)
    } else {
      setShowContacts(filterPersons)
    }
  }

  const update = (id, person) => {
    contactHandler.updateNum(id, person)
  }

  const addContact = (event) => {
    event.preventDefault()
    let nameExists = false
    let tempPerson

    persons.forEach((contactTemp) => {
      if (contactTemp.name === newName) {
        nameExists = true
        tempPerson = contactTemp
      }
    })

    if (!nameExists) {
      const newContact = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newContact))
      contactHandler.addContact(newContact)
      setNewName('')
      setNewNumber('')

      contactHandler.readAll()
        .then(tempPersons => {
          setPersons(tempPersons)
          setShowContacts(tempPersons)
        })
    } else {
      let confirm = window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)
      if (confirm) {
        const newContact = {
          name: newName,
          number: newNumber
        }
        let id = tempPerson.id
        update(id, newContact)
        setNewName('')
        setNewNumber('')

        contactHandler.readAll()
          .then(tempPersons => {
            setPersons(tempPersons)
            setShowContacts(tempPersons)
          })
      }
    }
  }

  const deleteContact = (person) => {
    let confirm = window.confirm(`Poistetaanko ${person.name}?`)
    if (confirm) {
      contactHandler.deleteContact(person)
      contactHandler.readAll()
        .then(tempPersons => {
          setPersons(tempPersons)
          setShowContacts(tempPersons)
        })
    }
  }

  const mapNames = () => showContacts.map(person =>
    <div key={person.name + "_div"}>
      <p key={person.name}>{person.name} {person.number}</p>
      <button onClick={() => deleteContact(person)} className="btn btn-primary" key={person.name + "_btn"}>Poista</button>
    </div>
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