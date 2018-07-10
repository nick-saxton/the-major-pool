const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/db');

const entries = require('./routes/api/entries');

const app = express();

// BodyParser Middleware
app.use(bodyParser.json());

// Connect to the database
db((() => {}));

// Use routes
app.use('/api/entries', entries);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...`))