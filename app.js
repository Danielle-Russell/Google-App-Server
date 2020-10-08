const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const apps = require('./data.js');

app.use(morgan('common'));

app.use(cors());

app.get('/apps', (req,res) => {

const { genres="", sort } = req.query;

if (sort) {
    if (!['App', 'Rating'].includes(sort)) 
    {
        return res.status(400).send('Sort must be of app or rating')
    }
}

let results = apps.filter(app => 
    app.Genres
    .toLowerCase()
    .includes(genres.toLowerCase()));

    

    if (sort === 'Rating') {
        results.sort( (a, b) => {
            return b.Rating - a.Rating
        })
    }

    if (sort === 'App') {
        results.sort((a, b) => {
            let appA = a.App.toUpperCase();
            let appB = b.App.toUpperCase();
            if (appA < appB) {
                return -1
            } if (appA > appB) {
                return 1
            }
            return 0
        })
    }

res.json(results)
})

app.listen(5000, () => {
    console.log('Server started on PORT 5000');
  });

  module.exports = app;