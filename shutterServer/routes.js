const express = require('express');
const controller = require("./controllers.js");

const router = express.Router();

router.get('/daily', controller.getSubject);
router.get('/photos', controller.getPhotos);

router.post('/photos', controller.postPhoto);

router.put('/photos/:id/like', controller.likePhoto);
router.put('/photos/:id/report', controller.reportPhoto);



module.exports = router;
