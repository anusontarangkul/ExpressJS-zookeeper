const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes')

// parse incoming string or data array
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.use(express.static('public'));

const { animals } = require('./data/animals.json');



app.listen(PORT, () => {
    console.log(`API Server now on ${PORT}`);
});