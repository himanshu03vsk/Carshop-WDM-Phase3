exports.getAllBuyerAddresses = (req, res) => {
    res.status(200).json({ message: 'getAllBuyerAddresses' });
}


exports.getBuyerAddressById = (req, res) => {
    res.status(200).json({ message: 'getBuyerAddressById' });
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