const {shanghaiConfig} = require('./config');
const {shanghaiOnePage} = require('./OnePageData');
const {getRoundData} = require('./OneRoundData');
const {createSH} = require('./mongo');

function * climb() {
  let index = shanghaiConfig.startIndex;
  while (index < shanghaiConfig.endIndex) {
    yield getRoundData(shanghaiConfig.url, index, shanghaiConfig.eachOperand, shanghaiOnePage);
  }
  index += shanghaiConfig.eachOperand;
}

const c = climb();
function save() {
  const pro = c.next().value;
  pro.then((res) => {
    res.forEach(datas => {
      datas.forEach(data => {
        createSH(data).then(() => {
          console.log('saved!');
        });
      })
    })
    save()
  });
}

save();
