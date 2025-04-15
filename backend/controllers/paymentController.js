const Payment = require('../models/payment');


exports.getAllPayments = (req, res) => { 


    res.status(200).json({'message': 'get all payments'})
};

exports.getPaymentByEmail = async (req, res) => {

    const { buyer_email } = req.params;

    if (!buyer_email) return res.status(400).json({ message: 'Email is required' });
    try {
        const payment = await Payment.findAll({ where: { buyer_email: buyer_email } });
        if (!payment) return res.status(404).json([]);
        res.status(200).json(payment);
    }
    catch (err) {
        console.error('Error in getPaymentByEmail:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.createPayment = (req, res) => {
    res.status(200).json({'message': 'create payment'})
}

exports.updatePayment = (req, res) => {
    res.status(200).json({'message': 'update payment'})
}

exports.deletePayment = (req, res) => {
    res.status(200).json({'message': 'delete payment'})
}
