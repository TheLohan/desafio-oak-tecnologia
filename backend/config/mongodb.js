const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/desafio_oak', { useNewUrlParser: true })
    .then(console.log('Conectado ao banco.'))
    .catch(error => {
        console.log(error)
    })