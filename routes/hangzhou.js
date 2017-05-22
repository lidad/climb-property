const express = require('express');
const router = express.Router();
const HZModel = require('../models/HZModel');

router.get('/', (req, res, next) => {
  res.render('hangzhou')
})

router.get('/getdata', (req, res, next) => {
  HZModel.getHangzhouData().then((data) => {
    const datas = data.map((data, i) => {
      let tempData = [];
      tempData.push(data.dealAmount);
      tempData.push(data.area);
      tempData.push(data.homeModel);
      tempData.push(data.dealDate);
      tempData.push(data.perMeter.replace(/[^\d]/g, '') / 10000);
      tempData.push(data.goodsInfo);
      return tempData;
    })
    res.send({datas})
  }).catch(next);
})

module.exports = router;
