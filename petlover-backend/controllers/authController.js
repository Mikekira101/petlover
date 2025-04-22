console.log('Intentando importar el modelo User...');
const User = require('../models/User');
console.log('Modelo User importado correctamente.');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'El usuario ya existe' });

        const user = new User({ name, email, phone, password });
        await user.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};

exports.registerUser = async (req, res) => {
    const { name, email, phone, password } = req.body;

    // Validar campos obligatorios
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'El usuario ya existe' });

        const user = new User({ name, email, phone, password });
        await user.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (err) {
        console.error('Error en registerUser:', err); // Agrega un log para depuración
        res.status(500).json({ message: 'Error del servidor' });
    }
};