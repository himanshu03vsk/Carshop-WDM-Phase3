const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Person = require('./Person');

const Buyer = sequelize.define('Buyer', {
    buyer_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        references: {
            model: Person,
            key: 'email'
        }
    }
}, {
    tableName: 'buyer'
});

module.exports = Buyer;
