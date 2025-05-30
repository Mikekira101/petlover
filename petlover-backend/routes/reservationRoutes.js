const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation'); // Importa el modelo de reserva

// Ruta para crear una reserva
router.post('/', async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();
        res.status(201).json({ message: 'Reserva creada', reservation });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la reserva', error: error.message });
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