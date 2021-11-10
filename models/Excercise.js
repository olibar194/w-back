const { Schema, model } = require('mongoose')

const ExcerciseSchema = Schema({
  nameE: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  type_reps: {
    type: String,
    required: true,
  },
  muscle_area: {
    type: Array,
    required: true,
  },
  element: {
    type: Array,
    required: true,
  },
  professor_id: {
    type: String,
    required: true,
  },
  professor_name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  img: {
    type: String, //This Schema should be mentioned as a string
    required: false,
  },
  link: {
    type: String, //This Schema should be mentioned as a string
    required: false,
  },
})

ExcerciseSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

module.exports = model('Excercise', ExcerciseSchema)
