const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB conectado correctamente');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1); // Detiene la aplicación si no puede conectarse
    }
};

module.exports = connectDB;