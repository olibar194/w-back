const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt')
const mongoose = require('mongoose')

const crearUsuario = async (req, res = response) => {
  const { name, lastname, dni, email, password, username } = req.body

  console.log('los trim son')
  console.log(name.trim() == '')
  console.log(lastname.trim() == '')

  if (name.trim() == '' || lastname.trim() == '') {
    return res.status(400).json({
      ok: false,
      msg: 'El nombre o apellido deben contener caracteres',
    })
  }

  try {
    let username2 = await Usuario.findOne({ username })

    if (username2) {
      return res.status(400).json({
        ok: false,
        msg: 'El nombre de usuario que elegiste ya existe',
      })
    }

    let usuario = await Usuario.findOne({ email })

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe',
      })
    }

    let dni2 = await Usuario.findOne({ dni })

    if (dni2) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario con el mismo DNI',
      })
    }
    console.log(req.body)
    usuario = new Usuario(req.body)

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, salt)

    await usuario.save()

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name)

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      is_professor: usuario.is_professor,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    })
  }
}

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body

  try {
    const usuario = await Usuario.findOne({ email })

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con ese email',
      })
    }

    // Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password)

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto',
      })
    }

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name)

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      is_professor: usuario.is_professor,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    })
  }
}

const revalidarToken = async (req, res = response) => {
  const { uid, name } = req

  // Generar JWT
  const token = await generarJWT(uid, name)
  try {
    let usuario = await Usuario.findById(uid).exec()
    console.log(usuario)
    res.json({
      ok: true,
      uid: uid,
      name: name,
      is_professor: usuario.is_professor,
      token,
    })
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
}
