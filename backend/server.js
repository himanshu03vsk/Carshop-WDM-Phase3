const express = require('express');
const sequelize = require('./config/db');
const Part = require('./models/Part');
const Car = require('./models/Car');
const Person = require('./models/Person');
const Buyer = require('./models/Buyer');
const Seller = require('./models/Seller');
const Shipment = require('./models/Shipment');
const Cart = require('./models/Cart');
const PaymentInfo = require('./models/PaymentInfo');
const BuyerAddress = require('./models/BuyerAddress');
const PartImage = require('./models/PartImage');
const PartSoldBy = require('./models/PartSoldBy');
const PartsOfCars = require('./models/PartsOfCars');

// Import routes
const partRoutes = require('./routes/partRoutes');
const carRoutes = require('./routes/carRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const shipmentRoutes = require('./routes/shipmentRoutes');
const partSoldByRoutes = require('./routes/partSoldByRoutes');
const partsOfCarsRoutes = require('./routes/partsOfCarsRoutes');
const buyerAddressRoutes = require('./routes/buyerAddressRoutes');
const partImageRoutes = require('./routes/partImageRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Use routes
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
app.use('/api/auth', authRoutes); // Use auth routes


sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Unable to sync the database:', err);
    });
