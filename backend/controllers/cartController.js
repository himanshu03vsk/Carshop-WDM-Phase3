// carController.js
const { where } = require('sequelize');
const Cart = require('../models/Cart'); // Assuming you have a Cart model defined in models/cartModel.js
// Function to get all cars
// exports.getCartById = async (req, res) => { 
//     const {buyer_email } = req.params;
//     // console.log(buyer_email);

//     try {
//         const cart_item = await Cart.findAll({where: { buyer_email: buyer_email }});
//         console.log(cart_item);
//         if (!cart_item || cart_item.length === 0) {
//             return res.status(200).json([]);
//         }
//         res.status(200).json(cart_item);
//     } catch (err) {
//         res.status(500).json({ error: 'Internal server error' });
//     }



// };

// exports.createCart = (req, res) => { 


//     res.status(200).json({'message': 'create cart'})
// };


// exports.updateCart = (req, res) => { 


//     res.status(200).json({'message': 'update cart'})
// };


// exports.deleteCart = (req, res) => { 


//     res.status(200).json({'message': 'Delete cart'})
// };
exports.addToCart = async (req, res) => {
    const { part_id, buyer_email, quantity, color } = req.body;
  
    if (!part_id || !buyer_email || !quantity || !color) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      const existingItem = await Cart.findOne({
        where: {
          part_id,
          buyer_email,
          color
        }
      });
  
      if (existingItem) {
        // Ensure quantity is a number before adding
        console.log('Existing item found:', existingItem);
        console.log('quantity in db', existingItem.quantity);
        console.log('quantity passed', quantity);
        
        // Parse the quantities to ensure they are numbers before adding
        const total = parseInt(existingItem.quantity, 10) + parseInt(quantity, 10);
        
        // Update the quantity in the DB
        await Cart.update(
          { quantity: total },
          {
            where: {
              part_id,
              buyer_email,
              color
            }
          }
        );
        
        console.log('Updated existing cart item:', existingItem);
        return res.status(200).json({ message: 'Cart item updated successfully' });
      } else {
        // Create new cart item if no existing item is found
        await Cart.create({
          part_id,
          buyer_email,
          quantity: parseInt(quantity, 10), // Ensure the quantity is parsed correctly
          color
        });
  
        return res.status(201).json({ message: 'Item added to cart successfully' });
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
};


// Function to get a car by make, model, and year


