const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const productController = require('./controllers/productController');

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

module.exports = router ;