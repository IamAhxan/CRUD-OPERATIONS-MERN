import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function UpdateUsers() {
    const { id } = useParams()

    const [user, setUser] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('https://crud-operations-mern-backend.onrender.com/getUser/' + id)
            .then(result => {
                console.log(result)
                setName(result.data.name)
                setEmail(result.data.email)
                setAge(result.data.age)
            })
            .catch(err => console.log(err))

    }, [])


    const update = (e) => {
        e.preventDefault()
        axios.put("https://crud-operations-mern-backend.onrender.com/updateUser/" + id, { name, email, age })
            .then(result => {
                console.log(result)
                navigate('/')
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={update}>
                    <h2>Edit User</h2>

                    <div className="mb-2">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            placeholder="Enter Name"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder="Enter Email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="age">Age</label>
                        <input
                            type="text"
                            id="age"

                            value={age}
                            placeholder="Enter Age"
                            className="form-control"
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-success">
                        Update
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUsers
