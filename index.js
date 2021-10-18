const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { dbConnection } = require('./database/config')

// Crear el servidor de express
const app = express()

// Base de datos
dbConnection()

// CORS
app.use(cors())

// Directorio Público
app.use(express.static('public'))

// Lectura y parseo del body
app.use(express.json())

// Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))
app.use('/api/excercise', require('./routes/excercise'))
// app.use('/api/workout', require('./routes/workout'))

// Escuchar peticiones
app.listen(4000, () => {
  console.log(`Servidor corriendo en puerto 4000`)
})
