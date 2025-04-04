const express = require('express');
const router = express.Router();
const buyerAddressController = require('../controllers/buyerAddressController');
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware
router.get('/', authMiddleware, buyerAddressController.getAllBuyerAddresses);
router.get('/:buyer_email/:line1', authMiddleware, buyerAddressController.getBuyerAddressById);
router.post('/', authMiddleware, buyerAddressController.createBuyerAddress);
router.put('/:buyer_email/:line1', authMiddleware, buyerAddressController.updateBuyerAddress);
router.delete('/:buyer_email/:line1', authMiddleware, buyerAddressController.deleteBuyerAddress);

module.exports = router;
