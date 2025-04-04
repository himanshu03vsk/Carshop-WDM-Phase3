const express = require('express');
const router = express.Router();
const partController = require('../controllers/partController');
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware

router.get('/',authMiddleware, partController.getAllParts);
router.get('/:id',authMiddleware, partController.getPartById);
router.post('/',authMiddleware, partController.createPart);
router.put('/:id',authMiddleware, partController.updatePart);
router.delete('/:id',authMiddleware, partController.deletePart);

module.exports = router;
