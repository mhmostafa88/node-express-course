const express = require('express')
const app = express();

let { people } = require('./data')

// static assets
app.use(express.static('./methods-public'));
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json());
app.get('/api/people', (req,res) => {
    res.status(200).json({success: true, data: people})
})

app.post('/api/people', (req,res) => {
    const {name} = req.body;
    if(!name){
        return res.status(400).json({success:false, msg: 'please provide name value'});
    }
    res.status(201).json({success: true, person:name})
})

app.post('/api/postman/people', (req,res) => {
    const {name} = req.body
    if(!name){
        return res.status(400).json({success:false, msg: 'please provide name value'})
    }
    res.status(201).json({success: true, data: [...people, name]})
})

app.post('/login', (req,res) => {
    const { name } = req.body;
    if(name){
        return res.status(200).send(`welcome ${name}`)
    }
    res.status(401).send('Please provide a name');
})

app.put('/api/people/:id', (req,res) => {
    const {id} = req.params;
    const {name} = req.body
    const person = people.find((person) => person.id === Number(id))

    if(!person){
        return res
        .status(404)
        .json({success:false, msg: `no person with id ${id}`})
    }
    
    const newPeople = people.map((person) => {
        if(person.id === Number(id)) {
            person.name = name
        }
        return person
    })
    // const newPerson = people.find(person => person.id === Number(id));
    // const restOfPeople = people.filter(person => person.id !== Number(id))
    // newPerson.name = name;
    res.status(201).json({success: true, data: newPeople})
})

app.delete('/api/people/:id', (req,res) => {
    const {id} = req.params;
    const person = people.find((person) => person.id === Number(id))
    if(!person){
        return res.status(404).json({succes:false, msg: `no person with id ${id}`})
    }
    const newPeople = people.filter((person) => {
        person.id !== Number(id)
    })
    return res.status(201).json({success: true, data: newPeople})
})

app.listen(5000, () => {
    console.log('Server is listening on port 50000')
})