/**
 * 确保URL字符串以 "https://" 开头
 * @param {*} url
 * @returns
 * console.log(ensureHttpsUrl('http://example.com')); // http://example.com
 * console.log(ensureHttpsUrl('https://example.com')); // https://example.com
 * console.log(ensureHttpsUrl('//example.com'));      // https://example.com
 * console.log(ensureHttpsUrl('example.com'));        // https://example.com
 * console.log(ensureHttpsUrl('ftp://example.com'));  // ftp://example.com
 */
const ensureHttpsUrl = (url) => {
  // 检查 URL 是否以 http:// 或 https:// 开头
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // 检查 URL 是否以 // 开头（协议相对 URL），并且添加 https: 前缀
  if (url.startsWith('//')) {
    return `https:${url}`;
  }
  // 检查 URL 是否以其他协议开头
  if (/^[a-zA-Z]+:\/\//.test(url)) {
    return url;
  }
  // 如果 URL 没有协议前缀，则添加 https://
  return `https://${url}`;
};

module.exports = ensureHttpsUrl;
