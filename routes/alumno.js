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
  quitarAlumno,
  añadirAlumno,
  // crearExcercise,
  // actualizarEvento,
  // eliminarEvento,
} = require('../controllers/alumno')

const router = Router()

// Todas las rutas tienen que pasar por la validación del JWT
router.use(validarJWT)

// Quitar alumno

router.patch(
  '/:id',
  [
    // check('title', 'El titulo es obligatorio').not().isEmpty(),
    // check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    // check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    // validarCampos,
  ],
  quitarAlumno
)
router.put(
  '/:id',
  [
    // check('title', 'El titulo es obligatorio').not().isEmpty(),
    // check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    // check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    // validarCampos,
  ],
  añadirAlumno
)

// Borrar evento
// router.delete('/:id', eliminarEvento)

module.exports = router
