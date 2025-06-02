const express = require('express');
const router = express.Router();
const {readAll} = require('../albumController')


router.get("/", readAll);

// router.get("/:id", readOne);


module.exports = router;
