const {shanghaiConfig} = require('./config');
const {shanghaiOnePage} = require('./OnePageData');
const {getRoundData} = require('./OneRoundData');
const {createSH} = require('./mongo');

function * climbAndSave() {
  const index = yield;
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
}

let index = shanghaiConfig.startIndex;
let cs;
let res;
while (index < shanghaiConfig.endIndex) {
  cs = climbAndSave();
  cs.next();
  cs.next(index);
  index += shanghaiConfig.eachOperand;
}
