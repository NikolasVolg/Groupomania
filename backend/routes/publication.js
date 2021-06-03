const express = require('express');
const router = express.Router();
const publicationCtrl = require('../controllers/publication');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, publicationCtrl.publiAll);
router.post('/publiCreate', auth, multer, publicationCtrl.publiCreate);
router.delete('/:id', auth, publicationCtrl.publiDelete);

module.exports = router;