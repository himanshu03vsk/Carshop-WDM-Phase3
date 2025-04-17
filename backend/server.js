const cors = require('cors');
const express = require('express');
const sequelize = require('./config/db');

// Importing models
const Part = require('./models/Part');
const Car = require('./models/Car');
const Person = require('./models/Person');
const Buyer = require('./models/Buyer');
const Seller = require('./models/Seller');
const Shipment = require('./models/Shipment');
const Cart = require('./models/Cart');
const PaymentInfo = require('./models/Payment');
const BuyerAddress = require('./models/BuyerAddress');
const PartImage = require('./models/PartImage');
const PartSoldBy = require('./models/PartSoldBy');
const PartsOfCars = require('./models/PartsOfCars');
const Order = require('./models/Order'); // Import Order model
// const User = require('./models/User'); // Import User model

// Import routes
const partRoutes = require('./routes/partRoutes');
const carRoutes = require('./routes/carRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const shipmentRoutes = require('./routes/shipmentRoutes');
const partSoldByRoutes = require('./routes/partSoldByRoutes');
const partsOfCarsRoutes = require('./routes/partsOfCarsRoutes');
const buyerAddressRoutes = require('./routes/buyerAddressRoutes');
const partImageRoutes = require('./routes/partImageRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes'); // Import order routes

// Associations


Order.hasMany(Shipment, { foreignKey: 'order_id' });
Shipment.belongsTo(Order, { foreignKey: 'order_id' });

Shipment.belongsTo(Part, { foreignKey: 'part_id' });
Part.hasMany(Shipment, { foreignKey: 'part_id' });

// Order hasMany Shipments

// Shipment belongsTo Order

// Shipment belongsTo Part

Seller.hasMany(PartSoldBy, { foreignKey: 'seller_email' });
PartSoldBy.belongsTo(Seller, { foreignKey: 'seller_email' });
/*


Part.hasMany(PartSoldBy, { foreignKey: 'part_id' });
PartSoldBy.belongsTo(Part, { foreignKey: 'part_id' });

Part.hasMany(PartsOfCars, { foreignKey: 'part_id' });
PartsOfCars.belongsTo(Part, { foreignKey: 'part_id' });

Car.hasMany(PartsOfCars, {
  foreignKey: ['make', 'model', 'car_year'], // not enforced directly
  sourceKey: ['make', 'model', 'car_year']   // required for Sequelize
});
PartsOfCars.belongsTo(Car, {
  foreignKey: {
    name: 'carCompositeKey',
    fields: ['make', 'model', 'car_year']
  },
  targetKey: ['make', 'model', 'car_year'] // again, just for reference
});*/

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Enable CORS with the correct configuration
app.use(cors({
    origin: 'http://localhost:5173',  // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
    credentials: true,  // Allow credentials like cookies or authentication
}));

// Routes
app.use('/api/buyer', buyerRoutes); // Buyer routes
app.use('/api/parts', partRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/part-sold-by', partSoldByRoutes);
app.use('/api/parts-of-cars', partsOfCarsRoutes);
app.use('/api/buyer-addresses', buyerAddressRoutes);
app.use('/api/part-images', partImageRoutes);
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/orders', orderRoutes); // Order routes
app.use('/api/reset-password', authRoutes); // Reset password routes

// Syncing database and starting the server

// Test the connection
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to SQL Server has been established successfully.');

    // Sync models with the database
    await sequelize.sync();
    console.log('Models synced successfully.');

    // Your server setup
    // const app = require('./app');
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit with failure code
  }
};

startServer();

// Handle unhandled promise rejections globally
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1); // Exit with failure code
});

// Handle uncaught exceptions globally
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
  process.exit(1); // Exit with failure code
});
