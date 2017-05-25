exports.getRoundData = function(url, index, operand, getOnePage) {
  const prs = Array.apply(null, {length: operand}).map((item, i) => {
    const pageIndex = index + i;
    return getOnePage(url + pageIndex);
  })
  return Promise.all(prs);
}
