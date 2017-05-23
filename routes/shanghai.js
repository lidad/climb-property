const express = require('express');
const router = express.Router();
const SHModel = require('../models/SHModel');

router.get('/', (req, res, next) => {
  res.render('shanghai')
})

router.get('/getdata', (req, res, next) => {
  SHModel.getShangHaiData().then((data) => {
    const datas = data.map((data, i) => {
      let tempData = [];
      tempData.push(data.dealAmount);
      tempData.push(data.homeModel.match(/\d+(\.\d+)?平/).shift().slice(0,-1));
      tempData.push(data.homeModel);
      tempData.push(data.dealDate);
      tempData.push(data.perMeter / 10000);
      tempData.push(data.zzone);
      return tempData;
    })
    res.send({datas})
  }).catch(next);
})

module.exports = router;
