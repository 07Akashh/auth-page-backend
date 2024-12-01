const express = require('express');
const userRoute = require('./user.route.js');
const app = express();

app.use('/user', userRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
