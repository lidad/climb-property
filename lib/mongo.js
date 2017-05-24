const Mongolass = require('mongolass');
const mongolass = new Mongolass();
const {mongodb} = require('../config');
mongolass.connect(mongodb.url);

exports.HZDeal = mongolass.model('HZDeal', {
  homeModel: {
    type: 'string'
  },
  area: {
    type: 'number'
  },
  dealDate: {
    type: 'string'
  },
  dealAmount: {
    type: 'number'
  },
  perMeter: {
    type: 'number'
  },
  goodsInfo: {
    type: 'string'
  }
})

exports.SHDeal = mongolass.model('SHDeal', {
  homeModel: {
    type: 'string'
  },
  dealDate: {
    type: 'string'
  },
  dealAmount: {
    type: 'string'
  },
  perMeter: {
    type: 'string'
  },
  zone: {
    type: 'string'
  }
})

// SHDeal.index({_id: 1}).exec();
