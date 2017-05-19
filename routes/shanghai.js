const express = require('express');
const router = express.Router();
const SHModel = require('../models/SHModel');

router.get('/', (req, res, next) => {
  SHModel.getShangHaiData().then((datas) => {
    res.render('shanghai', {datas})
  }).catch(next);
})

module.exports = router;
