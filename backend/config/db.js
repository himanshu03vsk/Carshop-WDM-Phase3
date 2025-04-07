require('dotenv').config({ path: '.env' }); // Adjust this path if needed

console.log('DB_NAME:', process.env.DB_NAME);   // Should print 'carshop'
console.log('DB_USER:', process.env.DB_USER);   // Should print 'root'
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);   // Should print 'kiminosei'
console.log('DB_HOST:', process.env.DB_HOST);   // Should print 'localhost'

const { Sequelize } = require('sequelize');

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
     // Log SQL queries for debugging
});



// const sequelize = new Sequelize('carshop', 'root', 'kiminosei', {
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: console.log // Log SQL queries for debugging
// });

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err.message);
    });

module.exports = sequelize;
