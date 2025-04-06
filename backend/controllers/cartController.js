// carController.js

// Function to get all cars
exports.getCartById = (req, res) => { 


    res.status(200).json({'message': 'get cart by id'})
};

exports.createCart = (req, res) => { 


    res.status(200).json({'message': 'create cart'})
};


exports.updateCart = (req, res) => { 


    res.status(200).json({'message': 'update cart'})
};


exports.deleteCart = (req, res) => { 


    res.status(200).json({'message': 'Delete cart'})
};






// Function to get a car by make, model, and year


