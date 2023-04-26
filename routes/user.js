const express = require("express");

const {
    getUserQuery1,
    getUserQuery2,
    getUserQuery3,
    getUserQuery4,
    getUserQuery5
} = require('../controllers/userController');

const router = express.Router();

router.get('/getUsers1',getUserQuery1);
router.get('/getUsers2',getUserQuery2);
router.get('/getUsers3',getUserQuery3);
router.get('/getUsers4',getUserQuery4);
router.get('/getUsers5',getUserQuery5);

module.exports = router;