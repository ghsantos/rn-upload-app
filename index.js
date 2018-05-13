const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const mongoose = require('mongoose')

const Image = require('./models/image')

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/nodeimage'
mongoose.connect(url)

const app = express()
const upload = multer({ dest: 'uploads/' })

app.use('/images/fullhd', express.static('images/fullhd'))
app.use('/images/prev', express.static('images/prev'))

app.get('/', (req, res) => {
  res.send('hello')
})

app.post('/images', upload.single('image'), (req, res) => {
  console.log(req.file)
  console.log(req.body)

  const { latitude, longitude } = req.body

  const imageFullhd = `images/fullhd/${req.file.filename}_fullhd.jpg`
  const imagePrev = `images/prev/${req.file.filename}_prev.jpg`

  sharp(`uploads/${req.file.filename}`)
    .resize(1920)
    .toFile(imageFullhd, (err) => {
      if (err) {
        console.log(err.code)
      }
    })

  sharp(`uploads/${req.file.filename}`)
    .resize(400, 400)
    .toFile(imagePrev, (err) => {
      if (err) {
        console.log(err.code)
      }
    })

  let image = new Image()
  image.name = req.file.originalname
  image.prevUrl = imagePrev
  image.fullhdUrl = imageFullhd
  image.latitude = latitude
  image.longitude = longitude
  image.save()
    .then((image) => {
      console.log(image)
      res.status(201).send(image)
    })
    .catch(err => {
      console.log(err.code)
      res.status(400).send({ err: err.code })
    })
})

app.get('/images', (req, res) => {
  Image.find({}).sort({ date: -1 })
    .then(images => {
      res.status(200).send(images)
    })
    .catch(err => {
      console.log(err.code)
      res.status(400).send({ err: err.code })
    })
})

app.listen(8080, '0.0.0.0')
