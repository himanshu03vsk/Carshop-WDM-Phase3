exports.getAllShipments = (req, res) => {
    res.status(200).json({ message: 'getAllShipments' });
};

exports.getShipmentById = (req, res) => {
    res.status(200).json({ message: 'getShipmentById' });
};

exports.createShipment = (req, res) => {
    res.status(200).json({ message: 'createShipment' });
};

exports.updateShipment = (req, res) => {
    res.status(200).json({ message: 'updateShipment' });
};

exports.deleteShipment = (req, res) => {
    res.status(200).json({ message: 'deleteShipment' });
};