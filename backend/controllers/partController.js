const Part  = require('../models/Part'); // Import your Part model
const Sequelize = require('sequelize'); // Make sure Sequelize is imported for operations like Op.ne
const PartColors = require('../models/PartColor'); // Import your PartColors model
const PartReviews = require('../models/Review'); // Import your PartReviews model
// Get related parts by category, excluding the current part
exports.getRelatedParts = async (req, res) => {
  const { category, exclude } = req.query;

  if (!category) {
    return res.status(400).json({ message: "Missing category" });
  }

  try {
    const relatedParts = await Part.findAll({
      where: {
        part_category: category,
        part_id: { [Sequelize.Op.ne]: exclude } // Exclude the part with the specified ID
      },
      limit: 5
    });

    res.json(relatedParts);
  } catch (err) {
    console.error("Error fetching related parts:", err);
    return res.status(500).json({ message: "Database error" });
  }
};

// Get all parts
exports.getAllParts = async (req, res) => {
  try {
    const parts = await Part.findAll();
    res.json(parts);
  } catch (err) {
    console.error("Error fetching parts:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Get part by ID
exports.getPartById = async (req, res) => {
  const { id } = req.params;

  try {
    const part = await Part.findByPk(id);
    if (!part) {
      return res.status(404).json({ message: "Part not found" });
    }
    // res.okay(200).json(part)
    res.json(part);
  } catch (err) {
    console.error("Error fetching part:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Create a new part
exports.createPart = async (req, res) => {
  const { part_name, part_description, price, dimensions, part_weight, part_color, part_type, part_category } = req.body;

  try {
    const newPart = await Part.create({
      part_name,
      part_description,
      price,
      dimensions,
      part_weight,
      part_color,
      part_type,
      part_category
    });

    res.status(201).json(newPart);
  } catch (err) {
    console.error("Error creating part:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Update an existing part
exports.updatePart = async (req, res) => {
  const { id } = req.params;
  const { part_name, part_description, price, dimensions, part_weight, part_color, part_type, part_category } = req.body;

  try {
    const part = await Part.findByPk(id);
    if (!part) {
      return res.status(404).json({ message: "Part not found" });
    }

    part.part_name = part_name || part.part_name;
    part.part_description = part_description || part.part_description;
    part.price = price || part.price;
    part.dimensions = dimensions || part.dimensions;
    part.part_weight = part_weight || part.part_weight;
    part.part_color = part_color || part.part_color;
    part.part_type = part_type || part.part_type;
    part.part_category = part_category || part.part_category;

    await part.save();
    res.json(part);
  } catch (err) {
    console.error("Error updating part:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Delete a part
exports.deletePart = async (req, res) => {
  const { id } = req.params;

  try {
    const part = await Part.findByPk(id);
    if (!part) {
      return res.status(404).json({ message: "Part not found" });
    }

    await part.destroy();
    res.status(204).json({ message: "Part deleted" });
  } catch (err) {
    console.error("Error deleting part:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Get part by name
exports.getPartByName = async (req, res) => {
  const { name } = req.query;

  try {
    const part = await Part.findOne({ where: { part_name: name } });
    if (!part) {
      return res.status(404).json({ message: "Part not found" });
    }
    res.json(part);
  } catch (err) {
    console.error("Error fetching part by name:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Get part by category
exports.getPartByCategory = async (req, res) => {
  const { category } = req.query;

  try {
    const parts = await Part.findAll({ where: { part_category: category } });
    if (parts.length === 0) {
      return res.status(404).json({ message: "No parts found in this category" });
    }
    res.json(parts);
  } catch (err) {
    console.error("Error fetching parts by category:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Get part by brand (assuming you have a brand field in your model)
exports.getPartByBrand = async (req, res) => {
  const { brand } = req.query;

  try {
    const parts = await Part.findAll({ where: { brand } }); // Assuming a 'brand' field exists
    if (parts.length === 0) {
      return res.status(404).json({ message: "No parts found for this brand" });
    }
    res.json(parts);
  } catch (err) {
    console.error("Error fetching parts by brand:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Get part by price range
exports.getPartByPrice = async (req, res) => {
  const { min, max } = req.query;

  try {
    const parts = await Part.findAll({
      where: {
        price: { [Sequelize.Op.between]: [min, max] }
      }
    });
    res.json(parts);
  } catch (err) {
    console.error("Error fetching parts by price:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Get part by model (assuming a 'model' field exists)
exports.getPartByModel = async (req, res) => {
  const { model } = req.query;

  try {
    const parts = await Part.findAll({ where: { model } }); // Assuming a 'model' field exists
    if (parts.length === 0) {
      return res.status(404).json({ message: "No parts found for this model" });
    }
    res.json(parts);
  } catch (err) {
    console.error("Error fetching parts by model:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Get part by type
exports.getPartByType = async (req, res) => {
  const { type } = req.query;

  try {
    const parts = await Part.findAll({ where: { part_type: type } });
    if (parts.length === 0) {
      return res.status(404).json({ message: "No parts found for this type" });
    }
    res.json(parts);
  } catch (err) {
    console.error("Error fetching parts by type:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Get part by year (assuming a 'year' field exists)
exports.getPartByYear = async (req, res) => {
  const { year } = req.query;

  try {
    const parts = await Part.findAll({ where: { year } }); // Assuming a 'year' field exists
    if (parts.length === 0) {
      return res.status(404).json({ message: "No parts found for this year" });
    }
    res.json(parts);
  } catch (err) {
    console.error("Error fetching parts by year:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Get part by color
exports.getPartByColor = async (req, res) => {
  const { color } = req.query;

  try {
    const parts = await Part.findAll({ where: { part_color: color } });
    if (parts.length === 0) {
      return res.status(404).json({ message: "No parts found for this color" });
    }
    res.json(parts);
  } catch (err) {
    console.error("Error fetching parts by color:", err);
    res.status(500).json({ message: "Database error" });
  }
};


exports.getPartColorsById = async (req, res) => {
  const { id } = req.params;
  try {
    const colors = await PartColors.findAll({
      where: { part_id: id }
    });

    if (!colors) {
      return res.status(404).json({ message: "Part not found" });
    }
    console.log(colors);
    // Check if colors is an array and parse it if necessary
    if (typeof colors === 'string') {
      colors = JSON.parse(colors); // Parse it to array if needed
    }
    console.log(colors);
    res.status(200).json({ colors: colors });
  } catch (err) {
    console.error("Error fetching part colors:", err);
    res.status(500).json({ message: "Database error" });
  }
}



exports.getReviewsByPartId = async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await PartReviews.findAll({ where: { part_id: id } });
    if (!reviews) {
      return res.status(404).json({ message: "No reviews found" });

    }
    res.status(200).json(reviews);

  }
  catch (err) {
    console.error("Error fetching part reviews:", err);
    res.status(500).json({ message: "Database error" });
  }
}