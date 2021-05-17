const express = require('express');
const router = express.Router();
const publicationCtrl = require('../controllers/publication');
const auth = require('../middleware/auth');

router.get('/publi', auth, publicationCtrl.publiWall);
router.post('/users/publiUser', auth, publicationCtrl.publiUser);
router.delete('/users/publiDelete', auth, publicationCtrl.publiDelete);

module.exports = router;