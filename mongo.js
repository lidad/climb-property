const Mongolass = require('mongolass');
const mongolass = new Mongolass();
const {mongodb} = require('./config');
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

module.exports = {
  create: function create(hzDdeal) {
    return HZDeal.create(hzDdeal).exec();
  }
}
