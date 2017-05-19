const express = require('express');
const router = express.Router();
const HZModel = require('../models/HZModel');

router.get('/', (req, res, next) => {
  HZModel.getHangzhouData().then((datas) => {
    res.render('hangzhou', {datas})
  }).catch(next);
})

module.exports = router;
