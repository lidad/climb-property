const express = require('express');
const router = express.Router();
const HZModel = require('../models/HZModel');
const SHModel = require('../models/SHModel');

const HANGZHOU_PER_METER_RANGE = [8000, 16000, 20000, 24000, 30000];
const SHANGHAI_PER_METER_RANGE = [
  30000,
  60000,
  90000,
  120000,
  150000,
  180000,
  210000
];

router.get('/', (req, res, next) => {
  res.render('home');
});

router.get('/hangzhouMeter', (req, res, next) => {
  let meterRange = HANGZHOU_PER_METER_RANGE;
  const proList = meterRange.reduce((tempList, meter, i, rangs) => {
    return tempList.concat(HZModel.getPerMeterCount(rangs[i - 1] || 0, meter))
  }, []);

  Promise.all(proList).then((resList) => {
    meterRange = [0].concat(HANGZHOU_PER_METER_RANGE);

    const perMeter = resList.reduce((tempList, count, i) => {
      return tempList.concat({
        name: meterRange[i] + '~' + meterRange[i + 1],
        value: count
      });
    }, [])

    res.send({perMeter});
  }).catch(next);

});

router.get('/shanghaiMeter', (req, res, next) => {
  let meterRange = SHANGHAI_PER_METER_RANGE;
  const proList = meterRange.reduce((tempList, meter, i, rangs) => {
    return tempList.concat(SHModel.getPerMeterCount(rangs[i - 1] || 0, meter))
  }, []);

  Promise.all(proList).then((resList) => {
    meterRange = [0].concat(SHANGHAI_PER_METER_RANGE);

    const perMeter = resList.reduce((tempList, count, i) => {
      return tempList.concat({
        name: meterRange[i] + '~' + meterRange[i + 1],
        value: count
      });
    }, [])

    res.send({perMeter});
  }).catch(next);

});

module.exports = router;
