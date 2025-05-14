const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Modelo de usuario

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
    const { name, email, password, phone } = req.body;

    console.log('Datos recibidos para registro:', { name, email, phone });

    try {
        // Crear un nuevo usuario
        const newUser = new User({ name, email, password, phone });
        const savedUser = await newUser.save();

        console.log('Usuario registrado exitosamente:', savedUser);

        res.status(201).json({ message: 'Usuario registrado exitosamente', user: savedUser });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
    }
});

module.exports = router;