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

let index = 1;
let url = '';
let prs = [];
for (; index < 5; index++) {
  url = config.url + index;
  prs.push(getOnePage(url))
}
console.log('loading....')

Promise.all(prs).then((res) => {
  res.forEach((result) => {
    console.log(result);
  })
})
