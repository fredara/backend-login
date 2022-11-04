const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.json('Hola Respuesta del servidor')
})

module.exports = app;