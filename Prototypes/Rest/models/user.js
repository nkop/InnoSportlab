/**
 * Created by Niels on 2-3-2017.
 */
var mongoose = require('mongoose');
var Video = mongoose.model('Video');
var ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    city: { type: String, required: true },
    rfid: { type: String, required: false },
    videos: [{ type: ObjectId, ref: 'Video' }],
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now }
});

mongoose.model('User', userSchema);