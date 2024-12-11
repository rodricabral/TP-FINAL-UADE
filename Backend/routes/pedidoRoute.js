const express= require('express');
const router= express.Router();

const controller = require('../controllers/pedido');

router.get('/', controller.getAllPedidos)
router.post('/', controller.createPedidos)
router.put('/:id', controller.updatePedido)
router.delete('/:id', controller.deletePedido)

module.exports =router;