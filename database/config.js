const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://juanma:user@cluster0.v8dh3.mongodb.net/test',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    )

    console.log('DB Online')
  } catch (error) {
    console.log(error)
    throw new Error('Error a la hora de inicializar BD')
  }
}

module.exports = {
  dbConnection,
}
