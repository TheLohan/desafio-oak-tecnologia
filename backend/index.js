require('./config/mongodb')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const product = require('./api/product')

app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.mongoose = mongoose

app.listen(4000, () => {
    console.log('Backend executando...')
})

app.route('/products')
    .post(product.save)
    .get(product.get)

app.route('/products/:id')
    .put(product.update)
    .delete(product.remove)
    .get(product.getByid)