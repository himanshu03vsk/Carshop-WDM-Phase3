const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware

// router.get('/', authMiddleware , cartController.getAllCarts);
// router.get('/:buyer_email', authMiddleware, cartController.getCartById);
// router.post('/', authMiddleware,cartController.createCart);
// router.put('/:part_id', authMiddleware, cartController.updateCart);
// router.delete('/:part_id/:buyer_email', authMiddleware, cartController.deleteCart);



router.put('/:buyer_email', authMiddleware, cartController.addToCart);
module.exports = router;
