const PartsOfCars = require('../models/PartsOfCars');
const Sequelize = require('sequelize');

exports.getAllPartsOfCars = (req, res) => {
    res.status(200).json({ message: 'getAllPartsOfCars' });
}

exports.getPartsOfCarsById = (req, res) => {
    res.status(200).json({ message: 'getPartsOfCarsById' });
}

exports.createPartsOfCars = (req, res) => {
    res.status(200).json({ message: 'createPartsOfCars' });
}

exports.updatePartsOfCars = (req, res) => {
    res.status(200).json({ message: 'updatePartsOfCars' });
}

exports.deletePartsOfCars = (req, res) => {
    res.status(200).json({ message: 'deletePartsOfCars' });
}

exports.searchParts = async (req, res) => {
  const { make, model, year } = req.query;

  try {
      // Construct the WHERE clause based on the query parameters
      const whereClause = {};

      if (make) whereClause.make = make;
      if (model) whereClause.model = model;
      if (year) whereClause.car_year = year;

      console.log("Constructed WHERE clause:", whereClause); // Log the generated WHERE clause

      // Perform the query using the constructed WHERE clause
      const parts = await PartsOfCars.findAll({
          where: whereClause,
          attributes: ['part_id'],
      });

      if (parts.length === 0) {
          console.log("No parts found matching the criteria");
      } else {
          console.log("Found parts:", parts); // Log the found parts data
      }

      const partIds = parts.map((part) => part.part_id);
      res.json(partIDs); // Send the found parts as the response
  } catch (err) {
      console.error('Error searching parts:', err.message); // Log the error
      res.status(500).json({ message: 'Server error', error: err.message });
  }
};