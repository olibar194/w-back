const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  tel: {
    type: String,
    // required: true,
  },
  illnes: {
    type: String,
  },
  num_of_day: {
    type: String,
  },
  is_professor: {
    type: Boolean,
    required: true,
  },
})

module.exports = model('Usuario', UsuarioSchema)
