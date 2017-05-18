const {shanghaiConfig} = require('../config');
const {shanghaiOnePage} = require('./OnePageData');
const {getRoundData} = require('./OneRoundData');
const {createSH} = require('../lib/mongo');

function * climb() {
  let index = shanghaiConfig.startIndex;
  let res;
  while (index < shanghaiConfig.endIndex) {
    res = yield getRoundData(shanghaiConfig.url, index, shanghaiConfig.eachOperand, shanghaiOnePage);
    res.forEach(datas => {
      datas.forEach(data => {
        createSH(data).then(() => {
          console.log('saved!');
        });
      })
    })
    yield;
    index += shanghaiConfig.eachOperand;
  }
}

const c = climb();
function save() {
  const pro = c.next().value;
  pro.then((res) => {
    c.next(res);
    save()
  })
}

save();
