exports.getAllPayments = (req, res) => { 


    res.status(200).json({'message': 'get all payments'})
};

exports.getPaymentById = (req, res) => {
    res.status(200).json({'message': 'get payment by id'})
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
exports.getPaymentByEmail = (req, res) => {
    res.status(200).json({'message': 'get payment by email'})
}