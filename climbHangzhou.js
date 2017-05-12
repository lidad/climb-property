const {hangzhouConfig} = require('./config');
const {hangZhouOnePage} = require('./OnePageData');
const {getRoundData} = require('./OneRoundData');
const {createHZ} = require('./mongo');

let index = hangzhouConfig.startIndex;
while (index < hangzhouConfig.endIndex) {
  getRoundData(hangzhouConfig.url, index, hangzhouConfig.eachOperand, hangZhouOnePage).then((res) => {
    res.forEach(datas => {
      console.log(datas)
      datas.forEach(data => {
        console.log(data)
        // createHZ(data).then(() => {
        //   console.log('saved!');
        // });
      })
    })
  });
  index += hangzhouConfig.eachOperand;
}
