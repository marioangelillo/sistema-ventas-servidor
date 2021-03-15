const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

router.post('/insert/',
[
  check('name','Debe completar el campo nombre').not().isEmpty(),
  check('price','Debe completar el campo precio').not().isEmpty(),
  check('stock','Debe completar el campo stock').not().isEmpty()    
  ],
  productController.insertProduct
);

router.post('/find/',
  productController.findProduct
);

router.delete('/deleteproduct/:id',
  productController.deleteProduct
);

router.put('/updateproduct/:id',
  productController.updateProduct
);

router.get('/createtable/',
  salesController.createTable
);

router.post('/newsale/',
  salesController.newSale
);

module.exports = router ;