var express = require('express');
var router = express();
var _ = require('underscore');
var handleError;
var async = require('async');

var mongoose = require('mongoose');
User = mongoose.model('User');

function getUsers(req, res){
  var query = {};
  if (req.params.id){
    query._id = req.params.id.toLowerCase();
  }

  User.find(query).then(data => {
      if(req.params.id){
      data = data[0];
    }
    res.json(data);
  }).fail(err => handleError(req, res, 500, err));
}

function addUser(req, res){
    console.log("adding user");
    var user = new User(req.body);
    user
        .save()
        .then(savedUser => {
            res.status(201);
            res.json(savedUser);
    })
    .fail(err => handleError(req, res, 500, err));
}

function putRFID(req, res){
    User.findById(req.params.id, function(err, user) {
        if (err) { handleError(req, res, 500, err); }

        user.rfid = req.body.rfid;

        user.save(function(err){
            if (err) {handleError(req, res, 500, err); }
            res.json(user);
        })
    });
}

/* GET users listing. */
router.route('/')
    .get(getUsers)
    .post(addUser);

router.route('/:id')
    .get(getUsers);

router.route('/:id/rfid')
    .put(putRFID);

module.exports = function (errCallback){
    console.log('Initializing users routing module');
    handleError = errCallback;
    return router;
}
