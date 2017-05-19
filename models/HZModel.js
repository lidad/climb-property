const {HZDeal} = require('../lib/mongo');

module.exports = {
  createHZ: function createSH(hzDdeal) {
    return HZDeal.create(hzDdeal).exec();
  },
  getHangzhouData:function getHangzhouData(author) {
    let query = {};
    if (author) {
      query.author = author;
    }
    return HZDeal.find({}).exec();
  }
}
