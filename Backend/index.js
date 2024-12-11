const express= require('express');
const app= express();
const cors = require('cors');

app.use(cors());

app.use(express.json());


const proveedorroutes= require('./routes/proveedorRoute');
const clienteroutes= require('./routes/clienteRoute');
const productoroutes= require('./routes/productoRoute');
/* const pedidoroutes= require('./routes/pedidoRoute'); */


const PORT = 3002;

app.use('/api/proveedor',proveedorroutes)
app.use('/uploads', express.static('uploads'));
app.use('/api/cliente',clienteroutes)
app.use('/api/producto',productoroutes)
/* app.use('/api/pedido',pedidoroutes) */

var admin = require("firebase-admin");

var serviceAccount = require("./practicando-firebase-8240a-firebase-adminsdk-8tuaw-49a36ed0d0.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.listen(PORT,() =>{
    console.log('listening on port '+ PORT);
});