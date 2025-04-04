const express = require('express');
const router = express.Router();
const partSoldByController = require('../controllers/partSoldByController');
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware

router.get('/',authMiddleware, partSoldByController.getAllPartSoldBy);
router.get('/:seller_email/:part_id',authMiddleware, partSoldByController.getPartSoldById);
router.post('/',authMiddleware, partSoldByController.createPartSoldBy);
router.put('/:seller_email/:part_id',authMiddleware, partSoldByController.updatePartSoldBy);
router.delete('/:seller_email/:part_id',authMiddleware, partSoldByController.deletePartSoldBy);

module.exports = router;
