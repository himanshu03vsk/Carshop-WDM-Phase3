const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware

router.get('/',authMiddleware, paymentController.getAllPayments);
router.get('/:method_no/:buyer_email',authMiddleware, paymentController.getPaymentById);
router.post('/',authMiddleware, paymentController.createPayment);
router.put('/:method_no/:buyer_email',authMiddleware, paymentController.updatePayment);
router.delete('/:method_no/:buyer_email',authMiddleware, paymentController.deletePayment);

module.exports = router;
