
const path = require("path")
const connection= require ("../connectDB/dBconnection")
const fs= require('fs')


function getAllPedidos(req,res){
    const query = "SELECT * FROM productos"

    connection.query(query,(err,result)=>{
        if (err){
            console.error(err)
            res.status(500).send("Error retrieving notes from database")
        } else {
            res.json(result)
        }
    })
}

function createProducto(req,res) {
    
    const {id, nombre, nombreComercial,seleccion,precioVenta,proveedor,precioCompra} = req.body
    const fotoProducto = req.file
    const query = "INSERT INTO productos (id, nombre, nombreComercial,seleccion,precioVenta,proveedor,precioCompra,fotoProducto) VALUES (?,?,?,?,?,?,?,?)"

    connection.query(query, [id, nombre, nombreComercial,seleccion,precioVenta,proveedor,precioCompra,fotoProducto], (err,result)=>{
        if (err) {
            console.error(err)
            res.status(500).send("Error, couldn't insert products")
        } else{
            res.json(result)
        }
    })
}

function updateProducto(req,res) {
    const id=req.params.id;
    const {nombre, nombreComercial,seleccion,precioVenta,proveedor,precioCompra} = req.body
    const fotoProducto = req.file ? `../uploads/${req.file.filename}` : null;  

    const values= [nombre, nombreComercial,seleccion,precioVenta,proveedor,precioCompra, id];
    
    const query = "UPDATE productos SET nombre=?, nombreComercial=?,seleccion=?,precioVenta=?,proveedor=?,precioCompra=?, fotoProducto=? WHERE id=?";
    connection.query(query, [nombre, nombreComercial,seleccion,precioVenta,proveedor,precioCompra, fotoProducto, id], (err,result)=>{
        if (err) {
            console.error(err)
            res.status(500).send("Error, couldn't insert products")
        } else{
            res.json(result)
        }
      });
}

function getProductoById(req,res) {
    const productoId = req.params.id

    const query= "SELECT * FROM productos WHERE id = ?"

    connection.query(query, [productoId], (err,result)=>{
        if (err) {
            console.error(err)
            res.status(500),send("Error retrieving product from database")
        }else{
            res.json(result)
        }
    })
}

function deleteProducto(req,res) {
    const productoId= req.params.id

    const query= "DELETE FROM productos WHERE id=?"

    connection.query(query, [productoId], (err, result) => {
        if(err){
            console.error(err)
            res.statust(500).send("Error deleting products from database")
        }else {
            res.json(result)
        }
    })
}

module.exports ={
    getAllPedidos,
    createProducto,
    updateProducto,
    getProductoById,
    deleteProducto
}
