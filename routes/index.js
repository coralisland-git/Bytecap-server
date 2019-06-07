var router = require('express').Router();
var path = require('path');
var fs = require('fs');

router.get('/', (req, res) => {
    var filePath = path.join(__dirname, '/../public/currencies.html');
    var data = fs.readFileSync(filePath, 'utf8');
    res.send(data);
})

router.get('/page1', (req, res) => {
    var filePath = path.join(__dirname, '/../public/monthly.html');
    var data = fs.readFileSync(filePath, 'utf8');
    res.send(data);
})

router.get('/page2', (req, res) => {
    var filePath = path.join(__dirname, '/../public/coinpage.html');
    var data = fs.readFileSync(filePath, 'utf8');
    res.send(data);
})

router.get('/page3', (req, res) => {
    var filePath = path.join(__dirname, '/../public/biggest.html');
    var data = fs.readFileSync(filePath, 'utf8');
    res.send(data);
})

router.get('/page4', (req, res) => {
    var filePath = path.join(__dirname, '/../public/24hour.html');
    var data = fs.readFileSync(filePath, 'utf8');
    res.send(data);
})

module.exports = router;
