const express = require('express')
const cors = require("cors");
const cookieSession = require("cookie-session");
const dotenv = require('dotenv').config();
const authRouter = require("./routes/auth.routes");
const config = require("./config.js");

const app = express()

var corsOptions = {
    origin: process.env.APP_HOST+":"+process.env.APP_PORT
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1) 
app.use(
    cookieSession({
        name: "avilatekSession",
        secret: config.SECRET,
        httpOnly: true,
        keys: ['key1','key2']
    })
);

app.get('/', (req, res) => {
    res.json('Hola, Respuesta del servidor')
})
app.use("/auth", authRouter);

module.exports = app;