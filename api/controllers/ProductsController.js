/**
 * ProductsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Products= require('../models/Products');


async function getAll(req, res) {
  const content = await Products.find();
  return res.send(content);
}

async function saveProduct(req, res) {
  let title=req.body.title;
  let price= req.body.price;
  let thumbnail= req.body.thumbnail;
  //Defino el valor del id en base al contenido del archivo
  //agrego el producto a la mongo
  const newProduct = new Products(title, price,thumbnail);
  await newProduct.save();
  return res.send(newProduct);

}


async function getByID(req, res) {
  const id= req.params.id;
  const prod=await Products.findOne({ id: id });
  return res.send(prod);
}


async function editByID(req,res) {
  let id= req.params.id;
  let title=req.body.title;
  let price= req.body.price;
  let thumbnail= req.body.thumbnail;

  let prod = await Products.findOne({ id: id });
  if (prod) {
    let updated =  new Products(title, price,thumbnail);
    await this.collection.findOneAndUpdate({_id: prod._id},updated);
    return res.send(updated);
  }
}

async function deleteById(req, res) {
  let content = await Products.find();
  const id= req.params.id;
  //Busco el index del id, y si existe lo elimino del array
  const index = content.findIndex(prod => prod.id === id);
  if (index !== -1) {
    const deleted=content[index];
    await this.collection.deleteOne({id: id});
    return res.send(deleted);
  }
}


module.exports = {
  saveProduct,
  getAll,
  getByID,
  editByID,
  deleteById
};

