import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Users() {
    const [user, setUser] = useState([])
    const [search, setSearch] = useState()
    // const [filteredUsers, setFilteredUsers] = useState([])

    useEffect(() => {
        axios.get('https://crud-operations-mern-backend.onrender.com')
            .then(result => {
                setUser(result.data)
                setFilteredUsers(result.data)
            })
            .catch(err => console.log(err))

        console.log(user)
    }, [])

    const filteredUsers = user.filter((u) =>
        (u?.name ?? "").toLowerCase().includes((search ?? "").toLowerCase())
    );


    const handleDelete = (id) => {
        axios.delete('https://crud-operations-mern-backend.onrender.com/deleteUser/' + id)
            .then(res => {
                console.log(res);

                setUser(prev => prev.filter(u => u._id !== id));
            })
            .catch(err => console.log(err));
    };


    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>

            <div className=' w-50 bg-white rounded p-3'>
                <div className="d-flex  justify-content-between">
                    <Link to='/create' className='btn btn-success '>Add +</Link>
                    <input
                        type="text"
                        id="search"
                        placeholder="Enter something"
                        className="form-control w-50 border-primary"
                        onChange={(e) => { setSearch(e.target.value) }}
                    />
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((u) => (
                            <tr key={String(u._id)}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.age}</td>
                                <td>
                                    <Link to={`/update/${u._id}`} className="btn btn-primary mx-2">Edit</Link>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(u._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        </div >
    )
}

export default Users
