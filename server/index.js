const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./db/connect')
const cookieParser = require('cookie-parser')
const cors = require('cors')


app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:5173/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
)
app.use(cookieParser());

app.get('/', (req,res) => {
  res.send(`<h1>Home Page</h1>`)
})


const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error)
  }
}

start();