/**
 * Created by Niels on 2-3-2017.
 */
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rfid: { type: String, required: false }
});

mongoose.model('User', userSchema);