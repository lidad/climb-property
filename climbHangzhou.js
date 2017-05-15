const {hangzhouConfig} = require('./config');
const {hangZhouOnePage} = require('./OnePageData');
const {getRoundData} = require('./OneRoundData');
const {createHZ} = require('./mongo');

function * climb() {
  let index = hangzhouConfig.startIndex;
  while (index <= hangzhouConfig.endIndex) {
    yield getRoundData(hangzhouConfig.url, index, hangzhouConfig.eachOperand, hangZhouOnePage)
    index += hangzhouConfig.eachOperand;
  }
}

const c = climb();
function save() {
  const pro = c.next().value;
  pro.then((res) => {
    res.forEach(datas => {
      datas.forEach(data => {
        createHZ(data).then(() => {
          console.log('saved!');
        });
      })
    })
    save()
  });
}

save();
