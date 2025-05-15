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
        res.status(201).json({ message: 'Usuario registrado exitosamente', user: savedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
    }
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }
        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
});
});

module.exports = router;