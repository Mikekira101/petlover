const mongoose = require('mongoose');

// Esquema de la reserva
const reservationSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nombre del cliente
    email: { type: String, required: true }, // Correo del cliente
    service: { type: String, required: true }, // Servicio reservado
    date: { type: Date, required: true }, // Fecha de la reserva
}, { timestamps: true }); // timestamps agrega createdAt y updatedAt automáticamente

module.exports = mongoose.model('Reservation', reservationSchema);
