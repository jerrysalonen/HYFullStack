import axios from 'axios'

const url = 'http://localhost:3001/persons'

const readAll = () => {
    const request = axios.get(url)
    return request.then(response => {
        console.log('data fetched')
        return response.data
    })
}

const addContact = person => {
    const request = axios.post(url, person)
    return request.then(response => response.data)
}

const deleteContact = person => {
    axios.delete(`${url}/${person.id}`)
}

const updateNum = (id, person) => {
    const request = axios.put(`${url}/${id}`, person)
    return request.then(response => response.data)
}


export default { readAll, addContact, deleteContact, updateNum }