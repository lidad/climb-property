const {HZDeal} = require('../lib/mongo');

module.exports = {
  createHZ: function createSH(hzDdeal) {
    return HZDeal.create(hzDdeal).exec();
  },
  getHangzhouData: function getHangzhouData(author) {
    return HZDeal.find({}).exec();
  },
  getPerMeterCount: function getPerMeterCount(beginRange, endRange) {
    const query = {
      perMeter: {
        $gte: beginRange,
        $lte: endRange
      }
    }
    return HZDeal.count(query).exec();
  }
}
