const {hangzhouConfig} = require('./config');
const {hangZhouOnePage} = require('./OnePageData');
const {getRoundData} = require('./OneRoundData');

let index = hangzhouConfig.startIndex;
while (index < hangzhouConfig.endIndex) {
  getRoundData(hangzhouConfig.url, index, hangzhouConfig.eachOperand, hangZhouOnePage).then((res) => {
    res.forEach(data => {
      if (data.length)
        console.log(data)
    })
  });
  //index += result.length;反爬虫会返回空的，若是空的则继续在这里
  index += hangzhouConfig.eachOperand;
}
