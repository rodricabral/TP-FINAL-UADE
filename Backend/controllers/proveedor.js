const connection= require ("../connectDB/dBconnection")

function getAllProveedores(req,res){
    const query = "SELECT * FROM proveedores"

    connection.query(query,(err,result)=>{
        if (err){
            console.error(err)
            res.status(500).send("Error al traer proveedor")
        } else {
            res.json(result)
        }
    })
}

    const createProveedor = async(req,res) => {
    const {id, nombre, cuit} = req.body
    console.log(req.body)
    const query = "INSERT INTO proveedores (id, nombre, cuit) VALUES (?, ?, ?)"

    connection.query(query, [id, nombre, cuit], (err,result)=>{
        if (err) {
            console.error(err)
            res.status(500).send("Error creando proveedor")
        } else{
            res.json(result)
        }
    })
}

function updateProveedor(req,res) {
    const {id}= req.params;
    const {nombre, cuit} = req.body;
    const query = "UPDATE proveedores SET nombre=?, cuit=? WHERE id=?";

    connection.query(query, [nombre, cuit, id], (err,result)=>{
        if (err) {
            console.error(err)
            res.status(500).send("Error, couldn't insert notes")
        } else{
            res.json(result)
        }
    })
}

function getProveedorById(req,res) {
    const proveedorId = req.params.id

    const query= "SELECT * FROM proveedores WHERE id = ?"

    connection.query(query, [proveedorId], (err,result)=>{
        if (err) {
            console.error(err)
            res.status(500),send("Error retrieving note from database")
        }else{
            res.json(result)
        }
    })
}

function deleteProveedor(req,res) {
    const proveedorId= req.params.id

    const query= "DELETE FROM proveedores WHERE id=?"

    connection.query(query, [proveedorId], (err, result) => {
        if(err){
            console.error(err)
            res.statust(500).send("Error deleting notes from database")
        }else {
            res.json(result)
        }
    })
}

module.exports ={
    getAllProveedores,
    createProveedor,
    updateProveedor,
    getProveedorById,
    deleteProveedor
}