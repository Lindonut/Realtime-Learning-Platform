const express = require('express')
const bodyParser = require('body-parser')
cookieParser = require('cookie-parser')
const cors = require('cors')

const authRouter = require ('./components/auth/auth.router')

const app = express()


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors());

require("dotenv").config();
require('./config/database')

app.use('/api/auth', authRouter);

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})