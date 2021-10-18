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
  },
  type_reps: {
    type: String,
  },
  duration_reps: {
    type: Number,
  },
  muscle_area: {
    type: Array,
  },
  element: {
    type: Array,
  },
  professor_id: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
})

ExcerciseSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

module.exports = model('Excercise', ExcerciseSchema)
