const express = require('express')

const app = express()

require("dotenv").config();
require('./config/database')

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})