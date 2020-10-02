const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const socket = require('socket.io')
const connectDB = require('./config/db')
const multer = require('multer')
const AWS = require('aws-sdk')
const fs = require('fs')
require('dotenv').config()

const app = express()

//force https
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https')
      return res.redirect('https://' + req.headers.host + req.url)
    else next()
  })
}

// Connect Database
connectDB()

// Init Middleware
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json())

// Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/chat', require('./routes/api/chat'))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// configuring the DiscStorage engine.
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

const S3_BUCKET = process.env.S3_BUCKET
const S3_REGION = process.env.S3_REGION

//setting the credentials
//The region should be the region of the bucket that you created
//Visit this if you have any confusion - https://docs.aws.amazon.com/general/latest/gr/rande.html

AWS.config.update({
  accessKeyId: process.env.S3_KEY /*|| keys.iam_access_id*/,
  secretAccessKey: process.env.S3_SECRET /*|| keys.iam_secret*/,
  region: S3_REGION
})

//Creating a new instance of S3:
const s3 = new AWS.S3()

//POST method route for uploading file
app.post('/api/post_file', upload.single('picture'), function (req, res) {
  //Multer middleware adds file(in case of single file ) or files(multiple files) object to the request object.
  //req.file is the demo_file
  uploadFile(req.file.path, req.file.filename, res)
})

//The uploadFile function
function uploadFile(source, targetName, res) {
  console.log('preparing to upload...')
  fs.readFile(source, function (err, filedata) {
    if (!err) {
      const putParams = {
        Bucket: S3_BUCKET,
        Key: targetName,
        Body: filedata
      }
      s3.putObject(putParams, function (err, data) {
        if (err) {
          console.log('Could nor upload the file. Error :', err)
          return res.send({ success: false })
        } else {
          fs.unlink(source, () => {
            console.log('local file deleted')
          }) // Deleting the file from uploads folder(Optional).Do Whatever you prefer.
          console.log('Successfully uploaded the file')
          return res.send({ success: true })
        }
      })
    } else {
      console.log({ err: err })
    }
  })
}

//Server
const PORT = process.env.PORT || 5000

var server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
)

//Socket.io
const io = socket(server)

io.on('connection', (socket) => {
  socket.on('send message', (body) => {
    io.emit('message', body)
  })
})
