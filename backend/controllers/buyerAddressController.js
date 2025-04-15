const BuyerAddress = require('../models/BuyerAddress');


exports.getAllBuyerAddresses = (req, res) => {
    res.status(200).json({ message: 'getAllBuyerAddresses' });
}


exports.getBuyerAddressByEmail = async (req, res) => {
    const { buyer_email } = req.params;
    try {
        // Simulate fetching buyer address from a database
        const buyerAddress = await BuyerAddress.findAll({ where: { buyer_email: buyer_email } });
        if (!buyerAddress) {
            return res.status(404).json([]);
        }
        res.status(200).json(buyerAddress);
    }
    catch (err) {
        console.error('Error in getBuyerAddressById:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }   
}

exports.createBuyerAddress = (req, res) => {
    res.status(200).json({ message: 'createBuyerAddress' });
}

exports.updateBuyerAddress = (req, res) => {
    res.status(200).json({ message: 'updateBuyerAddress' });
}

exports.deleteBuyerAddress = (req, res) => {
    res.status(200).json({ message: 'deleteBuyerAddress' });
}

exports.getBuyerAddressByBuyerId = (req, res) => {
    res.status(200).json({ message: 'getBuyerAddressByBuyerId' });
}