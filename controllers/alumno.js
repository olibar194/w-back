const { response } = require('express')
const Evento = require('../models/Evento')
const Excercise = require('../models/Excercise')
const Usuario = require('../models/Usuario')

const añadirAlumno = async (req, res = response) => {
  let alumno = req.uid

  let user = req.params.idProfe

  const info = {}
  info.alumnosProfe = await Usuario.find({ id_professor: user }).exec()
  info.alumnosGeneral = await Usuario.find({ has_professor: false }).exec()

  res.json({
    ok: true,
    info,
  })
}

const quitarAlumno = async (req, res = response) => {
  let alumno = req.uid

  let user = req.params.idProfe

  const info = {}
  info.alumnosProfe = await Usuario.find({ id_professor: user }).exec()
  info.alumnosGeneral = await Usuario.find({ has_professor: false }).exec()

  res.json({
    ok: true,
    info,
  })
}
module.exports = {
  añadirAlumno,
  quitarAlumno,
}
