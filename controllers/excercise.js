const { response } = require('express')
const Excercise = require('../models/Excercise')

const getExcercises = async (req, res = response) => {
  const excercises = await Excercise.find().populate('user', 'name')

  res.json({
    ok: true,
    excercises,
  })
}

const crearExcercise = async (req, res = response) => {
  const excercise = new Excercise(req.body)
  try {
    const { professor_id, nameE } = req.body
    let exs = await Excercise.findOne({
      professor_id: professor_id,
      nameE: nameE,
    })

    if (exs) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe el mismo nombre de ejercicio para tu cuenta de profesor',
      })
    } else {
      excercise.user = req.uid

      const excerciseGuardado = await excercise.save()

      res.json({
        ok: true,
        excercise: excerciseGuardado,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id
  const uid = req.uid

  try {
    const evento = await Evento.findById(eventoId)

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id',
      })
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento',
      })
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    }

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    )

    res.json({
      ok: true,
      evento: eventoActualizado,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id
  const uid = req.uid

  try {
    const evento = await Evento.findById(eventoId)

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id',
      })
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de eliminar este evento',
      })
    }

    await Evento.findByIdAndDelete(eventoId)

    res.json({ ok: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

module.exports = {
  getExcercises,
  crearExcercise,
  // actualizarEvento,
}
