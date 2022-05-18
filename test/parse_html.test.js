const cases = require('./cases');
const parseHtml = require('../src/douban/libs/parseHtml');
const keys = [
  'title',          'subtitle',      
  'original_title', 'id',
  'isbn',           'author',        
  'translator',     'publish',       
  'producer',       'publishDate',   
  'pages',          'price',
  'binging',        'series',        
  'book_intro',     'author_intro',  
  'catalog',        'cover_url',     
  'url',
];

cases.forEach((c) => {
  const info = parseHtml(c.html);
  keys.forEach(k => {
    // eslint-disable-next-line no-undef
    test(`${c.title}.${k}`, () => {
      // eslint-disable-next-line no-undef
      expect(info[k]).toEqual(c[k]);
    });
  });
});