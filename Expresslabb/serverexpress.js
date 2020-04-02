const express = require('express')
const app = express()
const port = 8080
const clientDir = __dirname + '\\client\\'
const bodyParser = require ('body-parser')
var myModule = require("./myModule");

app.use(express.json())
app.use(bodyParser.urlencoded())

app.get('/', (req, res) => {
  res.sendFile(clientDir + 'hostahemsida.html')
})

app.get('/style.css', (req, res) => {
  res.sendFile(clientDir + 'style.css')
})

app.get('/volvo240.jpg', (req, res) => {
  res.sendFile(clientDir + 'volvo240.jpg')
})

app.post('/', (request, response) => {

  let name = request.body.name;
  let email = request.body.email;
  let message = request.body.message;

  myModule.updateDb(email, name, message)

  response.sendFile(clientDir + 'hostahemsida.html')
})

app.get('*', (req, res) => {
  res.sendFile(clientDir + 'error.html')
})

app.listen(port, () => console.log(`Example app listening on port port 8080`))