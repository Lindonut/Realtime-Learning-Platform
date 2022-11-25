const express = require('express')
var bodyParser = require('body-parser')

const authRouter = require ('./components/auth/auth.router')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("dotenv").config();
require('./config/database')

app.use('/api/auth', authRouter);

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})