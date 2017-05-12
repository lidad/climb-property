const cheerio = require('cheerio');

const {shanghaiConfig} = require('./config');
const {shanghaiOnePage} = require('./OnePageData');

function getRoundData(url, index, operand) {
  const prs = Array.apply(null, {length: operand}).map((item, i) => {
    const pageIndex = index + i;
    return shanghaiOnePage(url + pageIndex);
  })
  return Promise.all(prs);
}

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
