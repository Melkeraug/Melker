const express = require('express')
const app = express()
const port = 3000
const clientDir = __dirname + '\\client\\'
const bcrypt = require('bcryptjs')

app.use(express.json())
app.use(express.urlencoded())

const users = []

app.get('/users', (req, rs) => {
  res.json(users)
})

app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.name, password: hashedPassword }
    users.push(user)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})

app.post('/users/login', async (req, res) => {
  const users = users.find(user => user,name === req.body.name)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success')
    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
})

app.get('/', (req, res) => res.sendFile(clientDir + 'index.html'))
app.get('/style', (req, res) => {
  res.sendFile(clientDir + 'style.css')
})

app.get('/Chicken.jpg', (req, res) => {
  res.sendFile(clientDir + 'chicken.jpg')
})

app.post('/login', function (req, res) {
  let name = req.body.namn
  let password = req.body.password
   console.log("namn: " + name + " password: " + password)
  res.send('POST request to the homepage')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))