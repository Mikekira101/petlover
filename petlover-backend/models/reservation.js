const mongoose = require('mongoose');
const ReservationSchema = new mongoose.Schema({
    name: String,
    email: String,
    date: String,
    time: String,
    service: String
});
module.exports = mongoose.model('Reservation', ReservationSchema);
