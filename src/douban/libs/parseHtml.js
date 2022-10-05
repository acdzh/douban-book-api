const cheerio = require('cheerio');

String.prototype.remove = function (...strs) {
  let _this = this;
  strs.forEach(str => {
    _this = _this.replace(new RegExp(str, 'g'), '');
  });
  return _this;
};

function toArray(obj) {
  if (typeof obj === 'undefined') {
    return [];
  }
  if (Array.isArray(obj)) {
    return obj;
  } else {
    return [obj];
  }
}

function getLinkingData($) {
  const cheerioScriptJsonLinkingDataEleText = $('head>script[type="application/ld+json"]')[0]?.children[0]?.data || '{}';
  try {
    const linkingData = JSON.parse(cheerioScriptJsonLinkingDataEleText);
    const author = linkingData.author.map(item => item.name);
    const {name: title, url, isbn} = linkingData;
    return {title, url, isbn, author};
  } catch {
    return {};
  }
}

function getTitle($) {
  return $('h1>span').text();
}

function getInfo($) {
  const info = {};
  const infoEle = $('#info');
  const spanEles = [...infoEle.children('span')];
  spanEles.forEach(spanEle => {
    if (spanEle.children.length === 1) {
      info[spanEle.children[0].data.remove(':', ' ')]
        = spanEle.next.next.name === 'a' ? $(spanEle.next.next).text() : spanEle.next.data.slice(1);
    } else {
      const children = spanEle.children.filter(ele => ele.name === 'span' || ele.name === 'a');
      info[children[0].children[0].data.remove(' ')] = children.slice(1).map(aEle => aEle.children[0].data);
    }
  });

  return info;
}

// function getIntros($) {
//   const intros = {
//     book: '',
//     author: '',
//   };
//   const relatedInfoELe = $('div.related_info')[0];
//   if (!relatedInfoELe) return intros;
//   const cheerioRelatedInfoELe = $(relatedInfoELe);
//
//   const bookIndentPEles = cheerioRelatedInfoELe.find('div.indent#link-report>span.all>div.intro>p');
//   intros.book = bookIndentPEles.map(ele => $(ele).text()).join('\n');
//   const authorIndentSpanEle = cheerioRelatedInfoELe.find('div.indent#link-report>span.all')[1];
// }

function getBookIntro($) {
  return $('div.intro')[0]?.children.filter(ele => ele.name === 'p').map(pEle => pEle.children[0]?.data || '').filter(data => data !== '').join('\n') || '';
}

function getAuthorIntro($) {
  return $('div.intro')[1]?.children.filter(ele => ele.name === 'p').map(pEle => pEle.children[0]?.data || '').join('\n') || '';
}

function getCatalog($, id) {
  return $(`div.indent#dir_${id}_full`)[0]?.children
    .filter(ele => ele.type === 'text')
    .map(ele => ele.data.remove('\n', '        '))
    .slice(0, -2) || [];
}

function getOriginalTexts($) {
  return [...$('ul.blockquote-list>li>figure')].map(figureEle => figureEle.children[0].data.remove('\n            ').slice(0, -1));
}

function getLabels($) {
  return [...$('div#db-tags-section.blank20>div.indent>span>a')].map(aEle => aEle.children[0].data);
}

function getCoverUrl($) {
  return $('div#mainpic>a.nbg')[0].attribs.href;
}

function getRating($) {
  const rating = {
    count: 0,
    info: '',
    value: 0,
    five_star_pre: 0,
    four_star_pre: 0,
    three_star_pre: 0,
    two_star_pre: 0,
    one_star_pre: 0,
  };
  const cheerioDivRatingSumEleSpanEle = $('div.rating_sum>span');
  if (cheerioDivRatingSumEleSpanEle.length === 0) return rating; // 评分被和谐
  const cheerioDivRatingSumEleSpanEleText = cheerioDivRatingSumEleSpanEle.text().remove('\n', ' ');
  const divRatingSumEleSpanEle = cheerioDivRatingSumEleSpanEle[0];
  if (cheerioDivRatingSumEleSpanEleText === '目前无人评价') {
    rating.info = '目前无人评价';
    return rating;
  }
  if (cheerioDivRatingSumEleSpanEleText === '评价人数不足') {
    rating.info = '评价人数不足';
    return rating;
  }
  rating.count = parseInt(divRatingSumEleSpanEle.children[1].children[0].children[0].data);
  rating.value = parseFloat($('strong.ll.rating_num')[0].children[0].data.remove(' '));
  [
    rating.five_star_pre,
    rating.four_star_pre,
    rating.three_star_pre,
    rating.two_star_pre,
    rating.one_star_pre
  ] = [...$('span.rating_per')].map(spanEle => parseFloat(spanEle.children[0].data.slice(0, -1)));
  return rating;
}

function getComments($) {
  return [...$('div.comment')].map(commentEle => {
    const comment = {};
    const cheerioCommentEle = $(commentEle);

    const commentVoteSpanEle = cheerioCommentEle.find('span.vote-count')[0];
    comment.vote = parseInt(commentVoteSpanEle.children[0].data);

    const commentInfoELe = cheerioCommentEle.find('span.comment-info')[0];
    const cheerioCommentInfoELe = $(commentInfoELe);
    const commentUserAEle = commentInfoELe.children[1];
    comment.user_name = commentUserAEle.children[0].data;
    comment.user_page = commentUserAEle.attribs.href;

    const commentUserStarsSpanELe = cheerioCommentInfoELe.find('span.user-stars')[0];
    comment.rating = {
      力荐: 5,
      推荐: 4,
      还行: 3,
      较差: 2,
      很差: 1,
      不存在: 0
    }[commentUserStarsSpanELe?.attribs?.title || '不存在'];

    const commentTimeSpanEle = cheerioCommentInfoELe.find('a.comment-time')[0];
    comment.date = commentTimeSpanEle?.children[0].data || '';

    const commentContentSpanEle = cheerioCommentEle.find('p.comment-content>span.short')[0];
    comment.content = $(commentContentSpanEle).text();
    return comment;
  });
}

function getReviews($) {
  return [...$('div.review-item')].map(reviewEle => {
    const review = {};
    const cheerioReviewEle = $(reviewEle);
    const cheerioMainHdHeaderEle = cheerioReviewEle.children('header.main-hd');
    const cheerioMainBdDivEle = cheerioReviewEle.children('div.main-bd');

    const avatarImgEle = cheerioMainHdHeaderEle.find('a.avator>img')[0]; // a.avator>img is not a mistake
    review.user_avatar = avatarImgEle.attribs.src;

    const nameAEle = cheerioMainHdHeaderEle.children('a.name')[0];
    review.user_name = nameAEle.children[0].data;
    review.user_page = nameAEle.attribs.href;

    const ratingSpanEle = cheerioMainHdHeaderEle.children('span.main-title-rating')[0];
    ratingSpanEle && (review.rating = {力荐: 5, 推荐: 4, 还行: 3, 较差: 2, 很差: 1}[ratingSpanEle.attribs.title] || 0);

    const mainMetaSpanEle = cheerioMainHdHeaderEle.children('span.main-meta')[0];
    review.time = mainMetaSpanEle?.children[0].data || '';

    const publisherAEle = cheerioMainHdHeaderEle.find('span.publisher>a.publisher')[0];
    review.publisher = publisherAEle?.children[0].data || '';
    review.publisher_page = publisherAEle?.attribs.href || '';

    const titleAEle = cheerioMainBdDivEle.find('h2>a')[0];
    review.title = titleAEle.children[0].data;
    review.url = titleAEle.attribs.href;

    const shortContentDivEle = cheerioMainBdDivEle.find('div.short-content')[0];
    review.short_content = shortContentDivEle.children.filter(c => c.type === 'text').map(e => e.data).join('')
      .remove('\n', ' ').slice(0, -3);

    const rUsefulCountSpanEle = cheerioMainBdDivEle.find('span[id^="r-useful_count"]')[0];
    const rUselessCountSpanEle = cheerioMainBdDivEle.find('span[id^="r-useless_count"]')[0];
    review.useful_count = parseInt(rUsefulCountSpanEle.children[0].data.remove('\n', ' ') || '0');
    review.useless_count = parseInt(rUselessCountSpanEle.children[0].data.remove('\n', ' ') || '0');

    const replyAEle = cheerioMainBdDivEle.find('a.reply')[0];
    review.reply_count = parseInt(replyAEle.children[0].data.slice(0, -2));
    return review;
  });
}

// eslint-disable-next-line no-unused-vars
function getNotes($) {
  // TODO
  return [];
}

function parseHTML(html, id) {
  const $ = cheerio.load(html);
  const info = getInfo($);
  const linkingData = getLinkingData($);

  if (!id) {
    id = /douban\.com\/book\/subject\/(\d+)\//.exec(html)[1];
  }
  return {
    title: getTitle($),
    subtitle: info.副标题 || '',
    original_title: info.原作名 || '',
    id,
    isbn: linkingData.isbn || info.ISBN || '',
    author: linkingData.author || [],
    translator: toArray(info.译者) || [],
    publish: info.出版社 || [],
    producer: info.出品方 || '',
    publishDate: info.出版年 || '',
    pages: info.页数 || 0,
    price: info.定价 || '',
    binding: info.装帧 || '',
    series: info.丛书 || '',
    // TODO: intro bugs
    book_intro: getBookIntro($),
    author_intro: getAuthorIntro($),
    catalog: getCatalog($, id),
    original_texts: getOriginalTexts($),
    labels: getLabels($),
    cover_url: getCoverUrl($),
    url: `https://book.douban.com/subject/${id}/`,
    rating: getRating($),
    comments: getComments($),
    reviews: getReviews($),
    notes: getNotes($),
  };
}

module.exports = parseHTML;

if (require.main === module) {
  const html = require('fs').readFileSync('.cache/html/id/26807576.html', {encoding: 'utf8'});
  const result = parseHTML(html);
  // require('fs').writeFileSync(`./.cache/result-3221090.json`, JSON.stringify(result, null, 2));
  console.log(result.book_intro);
}
