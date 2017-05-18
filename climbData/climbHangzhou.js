const {hangzhouConfig} = require('../config');
const {hangZhouOnePage} = require('./OnePageData');
const {getRoundData} = require('./OneRoundData');
const {createHZ} = require('../lib/mongo');

function * climb() {
  let index = hangzhouConfig.startIndex;
  let res;
  while (index <= hangzhouConfig.endIndex) {
    res = yield getRoundData(hangzhouConfig.url, index, hangzhouConfig.eachOperand, hangZhouOnePage);
    res.forEach(datas => {
      datas.forEach(data => {
        createHZ(data).then(() => {
          console.log('saved!');
        });
      })
    })
    yield;
    index += hangzhouConfig.eachOperand;
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
