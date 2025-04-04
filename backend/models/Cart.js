const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Part = require('./Part');
const Buyer = require('./Buyer');

const Cart = sequelize.define('Cart', {
    part_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Part,
            key: 'part_id'
        }
    },
    buyer_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        references: {
            model: Buyer,
            key: 'buyer_email'
        }
    },
    quanity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'cart'
});

module.exports = Cart;
