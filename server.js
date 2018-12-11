// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/carbloader");

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Model
var Food = mongoose.model('Food', {
    name: String,
    quantity: Number
});


// Get all food items
app.get('/api/carbloader', function (req, res) {

    console.log("Listing food & carbs...");

    //use mongoose to get all food in the database
    Food.find(function (err, food) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(food); // return all food in JSON format
    });
});

// Create a food Item
app.post('/api/carbloader', function (req, res) {

    console.log("Creating...");

    Food.create({
        name: req.body.name,
        quantity: req.body.quantity,
        done: false
    }, function (err, food) {
        if (err) {
            res.send(err);
        }

        // create and return all the food
        Food.find(function (err, food) {
            if (err)
                res.send(err);
            res.json(food);
        });
    });

});

// Update a food Item
app.put('/api/carbloader/:id', function (req, res) {
    const food = {
        name: req.body.name,
        quantity: req.body.quantity
    };
    console.log("Updating item - ", req.params.id);
        Food.update({_id: req.params.id}, food, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete a food Item
app.delete('/api/carbloader/:id', function (req, res) {
    Food.remove({
        _id: req.params.id
    }, function (err, food) {
        if (err) {
            console.error("Error deleting ", err);
        }
        else {
            Food.find(function (err, food) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(groceries);
                }
            });
        }
    });
});


// Start app and listen on port 8080  
app.listen(process.env.PORT || 8080);
console.log("Carbloader server listening on port  - ", (process.env.PORT || 8080));