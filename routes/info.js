/*
    Event Routes
    /api/info
*/
const { Router } = require('express')
const { check } = require('express-validator')

const { isDate } = require('../helpers/isDate')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const {
  getInfo,
  getGeneral,
  // crearExcercise,
  // actualizarEvento,
  // eliminarEvento,
} = require('../controllers/info')

const router = Router()

// Todas tienes que pasar por la validación del JWT
router.use(validarJWT)

//  Obtener general

router.get('/p', getGeneral)
// Obtener info profe
router.get('/p/:uid', getInfo)

// hacer lo mismo para alumno

// Crear un nuevo evento
// router.post(
//   '/',
//   [
//     check('nameE', 'El titulo es obligatorio').not().isEmpty(),
//     check('description', 'La descripción es obligatoria').not().isEmpty(),
//     check('difficulty', 'La dificultad es obligatoria').not().isEmpty(),
//     check('type_reps', 'El tipo de repetición es obligatorio').not().isEmpty(),
//     validarCampos,
//   ],
//   crearExcercise
// )

// Get Info
// router.put(
//   '/:id',
//   [
//     check('title', 'El titulo es obligatorio').not().isEmpty(),
//     check('start', 'Fecha de inicio es obligatoria').custom(isDate),
//     check('end', 'Fecha de finalización es obligatoria').custom(isDate),
//     validarCampos,
//   ],
//   actualizarEvento
// )

// Borrar evento
// router.delete('/:id', eliminarEvento)

module.exports = router
