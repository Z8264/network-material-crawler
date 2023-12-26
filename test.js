const extractSLD = require('./extractSLD');
const ensureHttpsUrl = require('./ensureHttpsUrl');
const fetchVideoInfo = require('./index');

test('extractSLD', async () => {
  let sld = extractSLD('https://www.bilibili.com/video/BV1xJ411n7X1');
  expect(sld).toBe('bilibili');

  sld = extractSLD('https://sub.example.co.uk');
  expect(sld).toBe('example');

  sld = extractSLD('https://example.com');
  expect(sld).toBe('example');
});
test('ensureHttpsUrl', async () => {
  let url = ensureHttpsUrl('http://example.com');
  expect(url).toBe('http://example.com');

  url = ensureHttpsUrl('https://example.com');
  expect(url).toBe('https://example.com');

  url = ensureHttpsUrl('//example.com');
  expect(url).toBe('https://example.com');

  url = ensureHttpsUrl('example.com');
  expect(url).toBe('https://example.com');

  url = ensureHttpsUrl('ftp://example.com');
  expect(url).toBe('ftp://example.com');
});

test('bilibili', async () => {
  const videoUrl = 'https://www.bilibili.com/video/BV19c411B7Re/?spm_id_from=333.1007.tianma.1-3-3.click&vd_source=cf5528c3cb3c69d7f8398e802787f15d';
  const data = await fetchVideoInfo(videoUrl);
  expect(data.title).toBe('【爆肝】在一个区块生存300天后，会变成什么样！_我的世界');
  expect(!!data.description).toBe(true);
  expect(!!data.image).toBe(true);
  expect(data.date).toBe('2023-11-24 17:00:00');
  expect(data.author).toBe('史蒂猪StevenPig');
  expect(data.sld).toBe('bilibili');
  expect(!!data.url).toBe(true);
});

test('bilibili: no https', async () => {
  const videoUrl = 'www.bilibili.com/video/BV19c411B7Re/?spm_id_from=333.1007.tianma.1-3-3.click&vd_source=cf5528c3cb3c69d7f8398e802787f15d';
  const data = await fetchVideoInfo(videoUrl);

  expect(data.title).toBe('【爆肝】在一个区块生存300天后，会变成什么样！_我的世界');
  expect(!!data.description).toBe(true);
  expect(!!data.image).toBe(true);
  expect(data.date).toBe('2023-11-24 17:00:00');
  expect(data.author).toBe('史蒂猪StevenPig');
  expect(data.sld).toBe('bilibili');
  expect(!!data.url).toBe(true);
});

test('error url', async () => {
  const videoUrl = 'errorUrl';
  const data = await fetchVideoInfo(videoUrl);

  expect(data.title).toBe('');
  expect(data.description).toBe('');
  expect(data.image).toBe('');
  expect(data.date).toBe('');
  expect(data.author).toBe('');
  expect(data.sld).toBe('');
  expect(data.url).toBe(videoUrl);
});
