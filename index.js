const axios = require('axios');
const cheerio = require('cheerio');
const extractSLD = require('./extractSLD');
const ensureHttpsUrl = require('./ensureHttpsUrl');
/**
 * 获取视频信息
 * @param {*} url
 * @returns
 */
const fetchVideoInfo = async (url) => {
  try {
    const httpsUrl = ensureHttpsUrl(url);
    const response = await axios.get(httpsUrl);
    const $ = cheerio.load(response.data);

    const sld = extractSLD(httpsUrl);

    let data = {};
    switch (sld.toLowerCase()) {
      case 'bilibili':
        data = {
          type: 'video',
          title: $('meta[name=\'title\']').attr('content').replace('_哔哩哔哩_bilibili', '').trim(),
          description: $('meta[name=\'description\']').attr('content'),
          image: $('meta[itemprop=\'image\']').attr('content'),
          author: $('meta[name=\'author\']').attr('content'),
          date: $('meta[itemprop=\'uploadDate\']').attr('content'),
          url: $('meta[itemprop=\'url\']').attr('content'),
        };
        [data.image] = data.image.split('@');
        break;
      default:
        data = {
          type: '',
          title: $('meta[name=\'title\']').attr('content'),
          description: $('meta[name=\'description\']').attr('content'),
          image: $('meta[itemprop=\'image\']').attr('content'),
          author: $('meta[name=\'author\']').attr('content'),
          date: $('meta[itemprop=\'uploadDate\']').attr('content'),
          url: $('meta[name=\'url\']').attr('content'),
        };
    }
    data.originalUrl = url;
    data.sld = sld;
    data.image = ensureHttpsUrl(data.image);
    return Promise.resolve(data);
  } catch {
    console.log('处理请求错误 Error fetching video information:', url);
    return Promise.resolve({
      type: '',
      title: '',
      description: '',
      image: '',
      author: '',
      date: '',
      url,
      sld: extractSLD(url),
    });
  }
};

module.exports = fetchVideoInfo;

// 调用函数并打印结果
// const videoUrl = 'https://www.bilibili.com/video/BV19c411B7Re/?spm_id_from=333.1007.tianma.1-3-3.click&vd_source=cf5528c3cb3c69d7f8398e802787f15d'; // 替换为实际的视频网页链接
// fetchVideoInfo('aaa')
//   .then((info) => console.log(info))
//   .catch((err) => {
//     console.log(err);
//   });
