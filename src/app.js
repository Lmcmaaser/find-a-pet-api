require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const validateBearerToken = require('./validate-bearer-token')
const errorHandler = require('./error-handler')
// const uuid = require('uuid/v4');
const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))
app.use(cors())
app.use(helmet())
app.use(validateBearerToken)
app.use(errorHandler)
app.use('/api/animals', animalsRouter)
app.use('/api/types', typesRouter)

app.get('/', (req, res) => {
  res.send('Hello, find-a-pet-api test!')
});


module.exports = app;
