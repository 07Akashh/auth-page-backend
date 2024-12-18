const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const detenv = require('dotenv').config();
const routes = require('./routes/route.js');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = process.env.PORT || 8000;
const uri = process.env.MONGO_URI

app.use(
    cors({
        origin: ['http://localhost:3000','https://authentication-form-implement.netlify.app'],
        credentials: true,
    })
);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});


app.use(express.json());
app.use(cookieParser());

mongoose.connect(uri).then(() => console.log('MongoDB Connected')).catch(err => console.log(err))

app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
