const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Person = require('./Person');

const Seller = sequelize.define('Seller', {
    seller_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        references: {
            model: Person,
            key: 'email'
        }
    },
    seller_org_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    member_since: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'seller',
    timestamps: false
});

module.exports = Seller;
    