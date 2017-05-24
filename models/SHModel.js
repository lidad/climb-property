const {SHDeal} = require('../lib/mongo');

module.exports = {
  createSH: function createSH(shDdeal) {
    return SHDeal.create(shDdeal).exec();
  },
  getShangHaiData:function getShangHaiData(author) {
    return SHDeal.find({}).exec();
  },
  getPerMeterCount: function getPerMeterCount(beginRange, endRange) {
    const query = {
      perMeter: {
        $gte: beginRange,
        $lte: endRange
      }
    }
    return SHDeal.count(query).exec();
  }
}
