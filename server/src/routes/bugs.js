const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bugsController');

router.get('/', ctrl.listBugs);
router.post('/', ctrl.createBug);
router.put('/:id', ctrl.updateBug);
router.delete('/:id', ctrl.deleteBug);

module.exports = router;
