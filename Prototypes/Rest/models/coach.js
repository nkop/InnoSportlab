/**
 * Created by Niels on 7-3-2017.
 */

/**
 * Created by Niels on 2-3-2017.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');
var ObjectId = mongoose.Schema.Types.ObjectId;

var coachSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    city: { type: String, required: true },
    sporters: [{ type: ObjectId, ref: 'User'}],
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now }
});

mongoose.model('Coach', coachSchema);