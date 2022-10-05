// ==UserScript==
// @name           自动刷新豆瓣图书缓存
// @description    https://github.com/acdzh/douban-book-api/
// @author         acdzh
// @connect        *
// @grant          GM_xmlhttpRequest
// @grant          GM_setClipboard
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_listValues
// @grant          GM_deleteValue
// @grant          GM_registerMenuCommand
// @include        https://book.douban.com/*
// @include        https://search.douban.com/book/subject_search*
// @version        1.2.0
// @icon           https://img3.doubanio.com/favicon.ico
// @run-at         document-end
// @namespace      doveboy_js
// ==/UserScript==


// This Userscirpt can't run under Greasemonkey 4.x platform
if (typeof GM_xmlhttpRequest === 'undefined') {
  alert('不支持Greasemonkey 4.x, 请换用暴力猴或Tampermonkey');
  return;
}

const getJSON = (url, callback) => {
  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {
      Accept: 'application/json'
    },
    onload: function (response) {
      if (response.status >= 200 && response.status < 400) {
        callback(JSON.parse(response.responseText), url);
      } else {
        callback(false, url);
      }
    }
  });
};

const postJSON = (url, data, callback) => {
  GM_xmlhttpRequest({
    method: 'POST',
    url: url,
    data: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    onload: function (response) {
      if (response.status >= 200 && response.status < 400) {
        callback(JSON.parse(response.responseText), url);
      } else {
        callback(false, url);
      }
    }
  });
};

const getJSONSync = (url) => new Promise((resolve, reject) => {
  getJSON(url, (res) => {
    if (res === false) {
      reject(res);
    } else {
      resolve(res);
    }
  });
});

const postJSONSync = (url, data) => new Promise((resolve, reject) => {
  postJSON(url, data, (res) => {
    if (res === false) {
      reject(res);
    } else {
      resolve(res);
    }
  });
});

const postPageData = () => {
  if (location.href.match(/douban.com\/subject\/\d+\//)) {
    const id = location.href.match(/(\d{7,8})/g);

    fetch(location.href).then(r => r.text()).then(html => {
      postJSONSync(`${origin}/book`, {
        html
      }).then(console.log, console.log);
    });

  } else if (location.href.match(/douban.com\/book\/subject_search/)) {
    const searchText = new URLSearchParams(location.search).get('search_text');
    if (searchText && searchText !== '') {
      postJSONSync(`${origin}/search?text=${searchText}`, {
        DATA: unsafeWindow.__DATA__
      }).then(console.log, console.log);
    }
  }
};

if (typeof GM_registerMenuCommand !== 'undefined') {
  const changeDomain = () => {
    const domain = prompt('api server', GM_getValue('domain', ''));
    if (domain != null && domain !== '') {
      try {
        const origin = new URL(domain).origin;
        GM_setValue('domain', origin);
      } catch (e) {
        alert('解析输入出错');
      }
    }
  };

  GM_registerMenuCommand('切换 domain', changeDomain);
  GM_registerMenuCommand('发送数据', postPageData);
}

const domain = GM_getValue('domain', '');

if (domain === '') {
  alert('请配置 api 服务器地址');
  return;
}

const origin = new URL(domain).origin;

window.addEventListener('load', postPageData);
