const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware

// router.get('/', authMiddleware , cartController.getAllCarts);
router.get('/:part_id/:buyer_email', authMiddleware, cartController.getCartById);
router.post('/', authMiddleware,cartController.createCart);
router.put('/:part_id/:buyer_email', authMiddleware, cartController.updateCart);
router.delete('/:part_id/:buyer_email', authMiddleware, cartController.deleteCart);

module.exports = router;
