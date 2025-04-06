// models/PartSoldBy.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PartsOfCars = sequelize.define('part_of_cars', {
  part_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  make: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true
  },
  model: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },

}, {
  timestamps: false,
  tableName: 'part_sold_by'
});

module.exports = PartsOfCars;
