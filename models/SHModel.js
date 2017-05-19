const {SHDeal} = require('../lib/mongo');

module.exports = {
  createSH: function createSH(shDdeal) {
    return SHDeal.create(shDdeal).exec();
  },
  getShangHaiData:function getShangHaiData(author) {
    return SHDeal.find({}).exec();
  }
}
