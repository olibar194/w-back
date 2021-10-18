const { response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req, res = response, next) => {
  // x-token headers
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición',
    })
  }

  try {
    const { uid, name } = jwt.verify(token, 'palabrasecreta')
    // console.log(is_profesor)
    req.uid = uid
    req.name = name
    // req.is_profesor = is_profesor
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido',
    })
  }

  next()
}

module.exports = {
  validarJWT,
}
