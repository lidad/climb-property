const cheerio = require('cheerio');
const http = require('http');
const request = require('superagent');

const config = require('./config');

function getHtml(url) {
  return new Promise((resolve, reject) => {
    request.get(url).end((err, res) => {
      err
        ? reject(err)
        : resolve(cheerio.load(res.text))
    })
  })
}

function getOnePage(url) {
  return getHtml(url).then(($) => {
    let result = [];
    $('.info-table').each((i, block) => {
      const row = $(block).find('.info-row');
      const item = {
        homeModel: $(row[0]).find('.text').text().replace(/\s/g, ''),
        dealDate: $(row[1]).find('.deal-item').text(),
        dealAmount: $(row[1]).find('.price-item  .strong-num').text(),
        perMeter: $(row[2]).find('.price-item').text(),
        zone: $(row[2]).find('.row2-text').text().replace(/\s/g, '')
      }
      result.push(item)
    });
    return result;
  })
}

function getRoundData(url, index, operand) {
  const prs = Array.apply(null, {length: operand}).map((item, i) => {
    const pageIndex = index + i;
    return getOnePage(url + pageIndex);
  })
  return Promise.all(prs);
}
let index = config.startIndex;
while (index < config.endIndex) {
  getRoundData(config.url, index, config.eachOperand).then((res) => {
    res.forEach(data => {
      if (data.length)
        console.log(data)
    })
  });
  //index += result.length;反爬虫会返回空的，若是空的则继续在这里
  index += config.eachOperand;
}
