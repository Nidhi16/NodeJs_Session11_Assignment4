var express = require('express');
var app = express();

var router = express.Router();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });
var jade = require('jade');

var cities = {
    'Mumbai': 'Mumbai is the financial center and largest city',
    'Delhi': 'Delhi is the captial of India',
    'Kolkata': 'Kolkata is the city of joy'
};

router.route('/')
    .get(function(request, response){
        response.json(Object.keys(cities));
    })
    .post(urlencode, function(request, response){
        var newCity = request.body;
        cities[newCity.name] = newCity.desc;
        response.status(201).json(newCity.name);
    });

router.route('/:name')
    .get(function (request, response) {
        var description = cities[request.params.name];
        var city = request.params.name;
        var content = jade.renderFile('./views/show.jade', {'name': city, 'desc': description});
        response.send(content);
    })
    .delete(function (request, response) {
        delete cities[request.params.name];
        response.sendStatus(204);
    });

module.exports = router;