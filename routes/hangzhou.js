const express = require('express');
const router = express.Router();
const HZModel = require('../models/HZModel');

router.get('/', (req, res, next) => {
  HZModel.getHangzhouData().then((data) => {
    const datas = data.map((data, i) => {
      delete data._id;
      let tempData = [];
      for (let key in data) {
        if (data.hasOwnProperty(key))
          tempData.push(data[key]);
        }
      return tempData;
    })
    res.render('hangzhou', {datas})
  }).catch(next);
})

module.exports = router;
