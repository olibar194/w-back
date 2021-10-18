/*
    Event Routes
    /api/events
*/
const { Router } = require('express')
const { check } = require('express-validator')

const { isDate } = require('../helpers/isDate')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const {
  getExcercises,
  crearExcercise,
  // actualizarEvento,
  // eliminarEvento,
} = require('../controllers/excercise')

const router = Router()

// Todas tienes que pasar por la validación del JWT
router.use(validarJWT)

// Obtener eventos
router.get('/', getExcercises)

// Crear un nuevo evento
router.post(
  '/',
  [
    check('nameE', 'El titulo es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  crearExcercise
)

// Actualizar Evento
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
