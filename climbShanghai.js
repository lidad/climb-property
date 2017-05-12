const {shanghaiConfig} = require('./config');
const {shanghaiOnePage} = require('./OnePageData');
const {getRoundData} = require('./OneRoundData');
const {createSH} = require('./mongo');

let index = shanghaiConfig.startIndex;
while (index < shanghaiConfig.endIndex) {
  getRoundData(shanghaiConfig.url, index, shanghaiConfig.eachOperand, shanghaiOnePage).then((res) => {
    res.forEach(datas => {
      datas.forEach(data => {
        console.log(data)
        createSH(data).then(() => {
          console.log('saved!');
        });
      })
    })
  });
  index += shanghaiConfig.eachOperand;
}
