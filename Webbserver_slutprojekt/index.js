const bcrypt = require('bcryptjs')
const express = require('express')
const UserModel = require('./UserModel')
const app = express()
const clientDir = __dirname + '\\client\\'
const port = 3000

app.use(express.json())
app.use(express.urlencoded())

const users = []
app.post("/", (req, res) => {
  let name = req.body.Username;
  let password = req.body.Password;
  Module.registerUser(name, password);
  res.sendFile(clientDir + "registrera.html");
});

app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    UserModel.registerUser(req.body.name, hashedPassword)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})

app.post('/login', async (req, res) => {
  try {
    const user = await UserModel.findUser(req.body.name)
    if (user == null) {
      return res.status(400).send('Cannot find user')
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success!')
    }
    else {
      res.send("FAILED!!!")
    }
  } catch {
    res.status(500).send()
  }
})

app.get('/users', async (req, res) => {
  try {
    let users = await UserModel.getUsersList()
    console.log(users)
    res.status(201).send(users)
  } catch {
    console.log("START MONGODB")
    res.status(500).send()
  }
})

app.get('/', (req, res) => 
  res.sendFile(clientDir + 'slutprojekt.html')
)

app.get('/ufc_html', (req, res) => {
  res.sendFile(clientDir + 'ufc.html')
})

app.get('/Gif_1', (req, res) => {
  res.sendFile(clientDir + 'gif1.gif')
})

app.get('/bild_1', (req, res) => {
  res.sendFile(clientDir + 'bild1.jpg')
})

app.get('/bild_3', (req, res) => {
  res.sendFile(clientDir + 'bild3.jpg')
})

app.get('/Kickboxning_html', (req, res) => {
  res.sendFile(clientDir + 'kickboxning.html')
})

app.get('/uppvaxt_html', (req, res) => {
  res.sendFile(clientDir + 'uppvaxt.html')
})

app.get('/registrera_html', (req, res) => {
  res.sendFile(clientDir + 'registrera.html')
})

app.get('/slutprojekt_css', (req, res) => {
  res.sendFile(clientDir + 'slutprojekt.css')
})

app.get('/kickboxning_2', (req, res) => {
  res.sendFile(clientDir + 'kickboxning2.jpg')
})

app.get('/kickboxning_1', (req, res) => {
  res.sendFile(clientDir + 'kickboxning1.jpg')
})

app.get('/gif_2', (req, res) => {
  res.sendFile(clientDir + 'gif2.gif')
})

app.get('/bild_9', (req, res) => {
  res.sendFile(clientDir + 'bild9.jpg')
})

app.get('/bild_10', (req, res) => {
  res.sendFile(clientDir + 'bild10.jpg')
})

app.get('/bild_7', (req, res) => {
  res.sendFile(clientDir + 'bild7.jpg')
})

app.get('/bild_8', (req, res) => {
  res.sendFile(clientDir + 'bild8.jpg')
})

app.get('/bild_5', (req, res) => {
  res.sendFile(clientDir + 'bild5.jpg')
})

app.get('/bild_6', (req, res) => {
  res.sendFile(clientDir + 'bild6.jpg')
})

app.get('/Gif_5', (req, res) => {
  res.sendFile(clientDir + 'gif5.gif')
})

app.get('/Gif_4', (req, res) => {
  res.sendFile(clientDir + 'gif4.gif')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))