require('dotenv').config();

const logger = require('morgan')
const express = require('express');
const errorhandler = require('errorhandler');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(logger('dev'));
app.use(errorhandler());
app.use(express.static(path.join(__dirname, 'public'))); // Serves the static file returned by the build

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get("/", function (req, res) {
    res.render('pages/home');
})

app.get("/about", function (req, res) {
    res.render('pages/about');
})

app.get("/features", function (req, res) {
    res.render('pages/features');
})

app.get("/feature/:id", function (req, res) {  
    const params = req.params.id;

    res.render('pages/feature', { id });
})

app.listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`);
})