const express = require('express');
const router = express.Router();
const publicationCtrl = require('../controllers/publication');
const auth = require('../middleware/auth');

router.get('/', auth, publicationCtrl.publiAll);
router.post('/publiCreate', auth, publicationCtrl.publiCreate);
router.delete('/:id', auth, publicationCtrl.publiDelete);

module.exports = router;