const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Part = require('./Part');
const Seller = require('./Seller');

const PartSoldBy = sequelize.define('PartSoldBy', {
    seller_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        references: {
            model: Seller,
            key: 'seller_email'
        }
    },
    part_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Part,
            key: 'part_id'
        }
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'part_sold_by'
});

module.exports = PartSoldBy;
