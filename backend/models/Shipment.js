const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Part = require('./Part');
const Seller = require('./Seller');
const Buyer = require('./Buyer');

const Shipment = sequelize.define('Shipment', {
    shipment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    shipment_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    shipment_address: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    shipment_status: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    shipment_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    payment_method: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    quanity_purchased: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    part_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Part,
            key: 'part_id'
        }
    },
    seller_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
            model: Seller,
            key: 'seller_email'
        }
    },
    buyer_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
            model: Buyer,
            key: 'buyer_email'
        }
    }
}, {
    tableName: 'shipment'
});

module.exports = Shipment;
