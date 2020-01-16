require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

require('./helpers/mongoose')

const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use('/', routes)

app.use((req, res, next) => {
    const err = {
        statusCode: 404,
        message: 'Page Not Found.'
    }
    next(err)
})

app.use(errorHandler)

app.listen(port, () => console.log('app running on port ' + port));