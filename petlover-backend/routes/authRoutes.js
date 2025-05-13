const express = require('express');
const router = express.Router(); // Crea una instancia de Router
const User = require('../models/User'); // Importa el modelo de usuario

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Verifica que todos los campos estén presentes
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Crea un nuevo usuario y guárdalo en la base de datos
        const newUser = new User({ name, email, password });
        const savedUser = await newUser.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente', user: savedUser });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);

        // Maneja errores como duplicados de email
        if (error.code === 11000) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
});

module.exports = router; // Exporta el router