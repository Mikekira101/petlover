const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation'); // Importa el modelo de reserva

// Ruta para crear una reserva
router.post('/create', async (req, res) => {
    const { name, email, service, date } = req.body;

    // Verifica que todos los campos estén presentes
    if (!name || !email || !service || !date) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Crea una nueva reserva y guárdala en la base de datos
        const newReservation = new Reservation({ name, email, service, date });
        const savedReservation = await newReservation.save();

        res.status(201).json({ message: 'Reserva creada exitosamente', reservation: savedReservation });
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        res.status(500).json({ message: 'Error al crear la reserva' });
    }
});

// Ruta para obtener todas las reservas
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (error) {
        console.error('Error al obtener las reservas:', error);
        res.status(500).json({ message: 'Error al obtener las reservas' });
    }
});

module.exports = router;