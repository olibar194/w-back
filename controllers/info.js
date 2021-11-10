const { response } = require('express')
const Evento = require('../models/Evento')
const Excercise = require('../models/Excercise')
const Usuario = require('../models/Usuario')

const getInfo = async (req, res = response) => {
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

const getGeneral = async (req, res = response) => {
  let user = req.uid
  // console.log(user)

  const general = {}
  // general.ejercicios = await Excercise.find({ user: user }).exec()
  general.alumnos = await Usuario.find({ has_professor: false }).exec()

  // console.log(general)
  res.json({
    ok: true,
    general,
  })
}

// const crearEvento = async (req, res = response) => {
//   const evento = new Evento(req.body)

//   try {
//     evento.user = req.uid

//     const eventoGuardado = await evento.save()

//     res.json({
//       ok: true,
//       evento: eventoGuardado,
//     })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({
//       ok: false,
//       msg: 'Hable con el administrador',
//     })
//   }
// }

// const actualizarEvento = async (req, res = response) => {
//   const eventoId = req.params.id
//   const uid = req.uid

//   try {
//     const evento = await Evento.findById(eventoId)

//     if (!evento) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'Evento no existe por ese id',
//       })
//     }

//     if (evento.user.toString() !== uid) {
//       return res.status(401).json({
//         ok: false,
//         msg: 'No tiene privilegio de editar este evento',
//       })
//     }

//     const nuevoEvento = {
//       ...req.body,
//       user: uid,
//     }

//     const eventoActualizado = await Evento.findByIdAndUpdate(
//       eventoId,
//       nuevoEvento,
//       { new: true }
//     )

//     res.json({
//       ok: true,
//       evento: eventoActualizado,
//     })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({
//       ok: false,
//       msg: 'Hable con el administrador',
//     })
//   }
// }

// const eliminarEvento = async (req, res = response) => {
//   const eventoId = req.params.id
//   const uid = req.uid

//   try {
//     const evento = await Evento.findById(eventoId)

//     if (!evento) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'Evento no existe por ese id',
//       })
//     }

//     if (evento.user.toString() !== uid) {
//       return res.status(401).json({
//         ok: false,
//         msg: 'No tiene privilegio de eliminar este evento',
//       })
//     }

//     await Evento.findByIdAndDelete(eventoId)

//     res.json({ ok: true })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({
//       ok: false,
//       msg: 'Hable con el administrador',
//     })
//   }
// }

module.exports = {
  getInfo,
  getGeneral,
  // crearEvento,
  // actualizarEvento,
  // eliminarEvento,
}
