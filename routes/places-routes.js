const express = require('express');
const router = express.Router();
const placesController = require('../models/Places-controller');
const {check} = require('express-validator');
router.get('/:pid', placesController.getPlacesById);
router.get('user/:uid', placesController.getPlacesByUser);
router.patch(
    '/:pid',
    [
        check('title').not().isEmpty(),
        check('description').isLength({min:6})
    ]
    ,placesController.updatePlace); 

router.post(
    '/', 
    [
        check('title').not().isEmpty(),
        check('description').isLength({min:6}),
        check('address').not().isEmpty()
    ]
    ,
    placesController.createPlace);


//router.patch('/:pid', placesController.updatePlace); 
router.delete('/:pid', placesController.deletePLace);
module.exports = router;