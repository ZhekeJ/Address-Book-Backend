const express = require('express')
const mongoose = require('mongoose')
const { MONGO_URL } = require('./config.js')

const clientsRoutes = require('./routes/api/clients')

const app = express()

app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//connect to MongoDB
mongoose.connect(MONGO_URL)
    .then(() => console.log('MongoDB Successfully Connected'))
    .catch(err => console.log(err));
// app.get('/', (req, res) => res.send('Hello World'))

app.use('/api/clients', clientsRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`))