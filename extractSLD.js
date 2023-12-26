const tldjs = require('tldjs');

/**
 * 获取网站网址的主域名（Second-Level Domain，SLD）而不包含顶级域名（Top-Level Domain，TLD）
 * @param {*} url
 * @returns
 * console.log(getSecondLevelDomain('https://www.bilibili.com/video/BV1xJ411n7X1')); // 返回 'bilibili'
 * console.log(getSecondLevelDomain('https://subdomain.example.co.uk')); // 返回 'example'
 * console.log(getSecondLevelDomain('https://example.com')); // 返回 'example'
 */
const extractSLD = (url) => {
  const parsed = tldjs.parse(url);
  const { domain } = parsed;
  return domain ? domain.split('.')[0] : '';
};
module.exports = extractSLD;
