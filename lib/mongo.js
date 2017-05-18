const Mongolass = require('mongolass');
const mongolass = new Mongolass();
const {mongodb} = require('../config');
mongolass.connect(mongodb.url);

const HZDeal = mongolass.model('HZDeal', {
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
  goodsInfo: {
    type: 'string'
  }
})
const SHDeal = mongolass.model('SHDeal', {
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

module.exports = {
  createSH: function create(shDdeal) {
    return SHDeal.create(shDdeal).exec();
  },
  createHZ: function create(hzDdeal) {
    return HZDeal.create(hzDdeal).exec();
  }
}
