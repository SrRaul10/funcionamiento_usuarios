const express = require('express');
const router = express.Router();
const placesController = require('../models/Places-controller');

router.get('/:pid', placesController.getPlacesById);
router.get('user/:uid', placesController.getPlacesByUser);
router.patch('/:pid', placesController.updatePlace); 
router.post('/', placesController.createPlace);
//router.patch('/:pid', placesController.updatePlace); 
router.delete('/:pid', placesController.deletePLace);
module.exports = router;