const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')


const mongoUrl = "mongodb+srv://mohammadahsan7744:2bUOKwM3L3MbY69G@cluster0.uydw7eo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const app = express()
const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json())

mongoose.connect(mongoUrl)

app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => console.log(err))
})

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id
    UserModel.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => console.log(err))
})

app.put("/updateUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id }, { name: req.body.name, email: req.body.email, age: req.body.age })
        .then(users => res.json(users))
        .catch(err => console.log(err))
})
app.delete("/deleteUser/:id", (req, res) => {
    const id = req.params.id
    UserModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => console.log(err)
        )
})

app.post("/createUser", (req, res) => {
    console.log(req.body)
    UserModel.create(req.body).then(users => res.json(users)).catch(err => res.json(err))
})

app.listen(port, () => {
    console.log("server in running")
})
