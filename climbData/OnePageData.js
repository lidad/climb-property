const cheerio = require('cheerio');
const request = require('superagent');
const http = require('http');

function getHtml(url) {
  return new Promise((resolve, reject) => {
    request.get(url).end((err, res) => {
      err
        ? reject(err)
        : resolve(cheerio.load(res.text))
    })
  })
}

function getShanghai(url) {
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

function getHangzhou(url) {
  return getHtml(url).then(($) => {
    let result = [];
    $('.listContent li').each((i, block) => {
      const $block = $(block);
      const item = {
        homeModel: $(block).find('.title').text() + $(block).find('.flood .positionIcon').text(),
        dealDate: $(block).find('.address .dealDate').text(),
        dealAmount: $(block).find('.address .totalPrice').text(),
        perMeter: $(block).find('.flood .unitPrice').text(),
        goodsInfo: $(block).find('.dealCycleeInfo .dealCycleTxt').text()
      }
      result.push(item)
    });
    return result;
  })
}

exports.shanghaiOnePage = getShanghai;
exports.hangZhouOnePage = getHangzhou;
