const mongoose = require('mongoose');
const { Schema } = mongoose;
const { existsOrError, notExistsOrError } = require('./validation')

const productSchema = new Schema({
name: {
  type: String,
  required: true
}, // String is shorthand for {type: String}
description: {
  type: String,
  required: true
},
price: {
  type: Number,
  required: true
},
isAvaliable: {
  type: Boolean,
  required: true
}
});

const ProductModel = mongoose.model('Product', productSchema)

const save = async (req, res) => {
  
  const productObject = {...req.body}

  try {

    existsOrError(productObject.name, 'Nome não definido.')
    existsOrError(productObject.description, 'Descrição não definida.')
    existsOrError(productObject.price, 'Preço não definido.')

  } 
  catch (error) {
    res.status(400).send(error)
  }

  await ProductModel.create(productObject)
    .then( _ => res.status(201).send())
    .catch(error => res.status(500).send(error))

}

const update = async (req, res) => {

  const productObject = {...req.body}
  try {
    existsOrError(productObject.name, 'Nome não definido.')
    existsOrError(productObject.description, 'Descrição não definida.')
    existsOrError(productObject.price, 'Preço não definido.')
  } 
  catch (error) {
    res.status(400).send(error)
  }

  await ProductModel.findByIdAndUpdate(req.params.id, productObject)
    .then(_ => res.status(201).send())
    .catch(error => res.status(500).send(error))


}

const remove = async (req, res) => {

  await ProductModel.findByIdAndDelete(req.params.id)
    .then(_ => res.status(201).send())
    .catch(error => res.status(500).send(error))


}

const   limit = 20
const get = async (req, res ) => {
  const page = req.query.page || 1
  const count = await ProductModel.estimatedDocumentCount()
  await ProductModel.find().sort({price: 1}).limit(limit).skip(page * limit - limit)
    .then(products => res.json({products, count, limit}))
}

const getByid = async (req, res) => {
  await ProductModel.findById(req.params.id)
    .then(product => res.json(product))
}

module.exports = {
  save, update, remove, get, getByid
}