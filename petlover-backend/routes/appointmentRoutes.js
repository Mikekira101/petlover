const express = require('express');
const router = express.Router();

// Ejemplo de endpoint para manejar citas
router.get('/', (req, res) => {
    res.send('Lista de citas');
});

router.post('/', (req, res) => {
    const { name, date, service } = req.body;
    res.send(`Cita creada para ${name} el ${date} para el servicio ${service}`);
});

module.exports = router;