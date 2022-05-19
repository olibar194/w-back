const { response } = require('express')

const Usuario = require('../models/Usuario')
const url = require('url')
const getAccount = async (req, res = response) => {
  var user = req.url.split('/')[1]

  info = await Usuario.find({ _id: user }).exec()
  console.log(info)
  // console.log(info)
  res.json({
    ok: true,
    info,
  })
}

const getAccount2 = async (req, res = response) => {
  let user = req.uid
  // console.log(user)

  const info = {}
  info.ejercicios = await Excercise.find({ user: user }).exec()
  info.alumnos = await Usuario.find({ id_professor: user }).exec()

  // console.log(info)
  res.json({
    ok: true,
    info,
  })
}

module.exports = {
  getAccount,

  getAccount2,
}
