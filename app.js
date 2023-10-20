require('dotenv').config();

const logger = require('morgan')
const express = require('express');
const errorhandler = require('errorhandler');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

// meta data for pages
const meta = {
    title: "",
    image: {
        "url": "",
        "alt": ""
    }
}

app.use(logger('dev'));
app.use(errorhandler());
app.use(express.static(path.join(__dirname, 'public'))); // Serves the static file returned by the build

// functions to use within the pug components
app.use(function (req, res, next) {
    res.locals.Link = function(link) {
        if (link && link === "Home") {
            return "/"
        }

        if (link && typeof link === 'string') {
            return `/${link.toLowerCase()}`
        }
    };

    next()
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get("/", function (req, res) {
    res.render('pages/home', { meta: {...meta, title: "Home"} });
})

app.get("/about", function (req, res) {
    res.render('pages/about', { meta: {...meta, title: "About us"} });
})

app.get("/features", function (req, res) {
    res.render('pages/features', { meta: {...meta, title: "Our Features"} });
})

app.get("/features/:id", function (req, res) {  
    const id = req.params.id;

    res.render('pages/single-feature', { 
        id,
        meta: { ...meta, title: `Page ${id}`}
    });
})

app.listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`);
})