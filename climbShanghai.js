const {shanghaiConfig} = require('./config');
const {shanghaiOnePage} = require('./OnePageData');
const {getRoundData} = require('./OneRoundData');

let index = shanghaiConfig.startIndex;
while (index < shanghaiConfig.endIndex) {
  getRoundData(shanghaiConfig.url, index, shanghaiConfig.eachOperand).then((res) => {
    res.forEach(data => {
      if (data.length)
        console.log(data)
    })
  });
  //index += result.length;反爬虫会返回空的，若是空的则继续在这里
  index += shanghaiConfig.eachOperand;
}
