const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.put('/updateCartItem/:buyer_email/:part_id/:color', authMiddleware, cartController.updateCartItem);
router.delete('/:buyer_email/:part_id/:color', authMiddleware, cartController.deleteCartItem);

router.put('/:buyer_email', authMiddleware, cartController.addToCart);
router.get('/:buyer_email', authMiddleware, cartController.getCartById);

module.exports = router;
