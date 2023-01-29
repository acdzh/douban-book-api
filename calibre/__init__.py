#!/usr/bin/env python3

__license__   = 'GPL v3'
__copyright__ = '2022, acdzh <acdzh@outlook.com>'

import json
import re
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
from queue import Queue, Empty
from urllib.parse import urlparse, unquote, urlencode, urljoin, quote
from urllib.request import Request, urlopen

from calibre import random_user_agent
from calibre.ebooks.metadata import check_isbn
from calibre.ebooks.metadata.book.base import Metadata
from calibre.ebooks.metadata.sources.base import Source, Option

DOUBAN_SEARCH_JSON_URL = "https://www.douban.com/j/search"
DOUBAN_BOOK_URL = 'https://book.douban.com/subject/%s/'

DEFAULT_DOUBAN_USE_CACHE = True
DEFAULT_DOUBAN_API_HOST = 'https://acdzh-douban-book-api.herokuapp.com/'
DEFAULT_DOUBAN_RESULT_LIMIT = 5
DEFAULT_DOUBAN_CONCURRENCY_SIZE = 2  # 并发查询数

# def method_logger(func):
#   def wrapper(*args, **kwargs):
#       print(f'[DEBUG] call {func.__name__}() {args} {kwargs}')
#       r = func(*args, **kwargs)
#       print(f'[DEBUG] └─── {func.__name__}() returns {r}')
#       return r
#   return wrapper

# def logger(cls):
#     orig_init = cls.__init__
#     def new_init(self, *args, **kwargs):
#       print(f'[DEBUG] [INIT] {cls.__name__} init {args} {kwargs}')
#       return orig_init(self, *args, **kwargs)
#     cls.__init__ = new_init

#     orig_getattribute = cls.__getattribute__
#     def new_getattribute(self, name):
#       print(f'[DEBUG] [GET] {cls.__name__} is getting {name}')
#       r = orig_getattribute(self, name)
#       print(f'[DEBUG] [GOT] └─── {cls.__name__} got {name}, value is {r}')
#       def method_log(func):
#         def wrapper(*args, **kwargs):
#             print(f'[DEBUG] [CALL] {cls.__name__} call {func.__name__}() {args} {kwargs}')
#             rr = func(*args, **kwargs)
#             print(f'[DEBUG] [CALL] └─── {func.__name__}() returns {rr}')
#             return rr
#         return wrapper
#       if str(type(r)) == "<class 'method'>":
#         r = method_log(r)
#       return r
#     cls.__getattribute__ = new_getattribute

#     orig_setattr = cls.__setattr__
#     def new_setattr(self, name, value):
#       print(f'[DEBUG] [SET] {cls.__name__} is setting {name}, value is {value}')
#       orig_setattr(self, name, value)
#     cls.__setattr__ = new_setattr

#     origin_call = cls.__call__
#     def new_call(self, *args, **kwargs):
#       print(f'[DEBUG] [CALL] {cls.__name__} call {args} {kwargs}')
#       return origin_call(self, *args, **kwargs)
#     cls.__call__ = new_call

#     return cls

# @logger
class DoubanBookSearcher:
  def __init__(self, api_host, concurrency_size, use_cache, result_limit):
    self.use_cache = use_cache
    self.api_host = api_host
    self.result_limit = result_limit
    self.concurrency_size = concurrency_size
    self.thread_pool = ThreadPoolExecutor(max_workers=concurrency_size, thread_name_prefix='douban_async')

  def request(self, url, log = None):
    start_time = time.time()
    query = f'update={0 if self.use_cache else 1}'
    if '?' in url:
      url = f'{url}&{query}'
    else:
      url = f'{url}?{query}'
    headers = { 'user-agent': random_user_agent() }
    res = urlopen(Request(url, headers = headers))

    if res.status == 200:
      if log is not None:
        log.info("Downloaded:{} Successful,Time {:.0f}ms".format(url, (time.time() - start_time) * 1000))
      try:
        res = json.loads(res.read())
        if res['success'] == True:
          return res['data']
      except:
        pass
    return None

  def get_book_by_douban_id(self, douban_id, log):
    url = urljoin(self.api_host, f'/subject/{douban_id}')
    data = self.request(url, log)
    return data

  def get_book_by_isbn(self, isbn, log):
    url = urljoin(self.api_host, f'/isbn/{isbn}')
    data = self.request(url, log)
    return data

  def search_books_by_keyword(self, keyword, log):
    url = urljoin(self.api_host, f'/search?text={quote(keyword)}')
    data = self.request(url, log)
    if data is None:
      return []

    douban_ids = []
    for item in data:
      tpl_name = item['tpl_name']
      if tpl_name == 'search_subject':
        douban_ids.append(item['id'])
    douban_ids = douban_ids[:self.result_limit]

    books = []
    futures = [self.thread_pool.submit(self.get_book_by_douban_id, douban_id, log) for douban_id in douban_ids]
    for future in as_completed(futures):
      book = future.result()
      if book is not None:
        books.append(future.result())
    return books
  
  def search_books(self, douban_id = None, isbn = None, keyword = None, log = None):
    if douban_id is not None and douban_id != '':
      book = self.get_book_by_douban_id(douban_id, log)
      if book is not None:
        return [book]
    elif isbn is not None and isbn != '':
      book = self.get_book_by_isbn(isbn, log)
      if book is not None:
        return [book]
    else:
      books = self.search_books_by_keyword(keyword, log)
      if books is not None:
        return books
    return []

# @logger
class DoubanBookAPI(Source):
  name = 'Douban Books API'
  description = 'Downloads metadata and covers from Douban Books web site.'
  # Platforms this plugin will run on
  supported_platforms = ['windows', 'osx', 'linux']
  author = 'acdzh'  # The author of this plugin
  version = (0, 0, 1)  # The version number of this plugin
  minimum_calibre_version = (5, 0, 0)
  capabilities = frozenset(['identify', 'cover'])
  touched_fields = frozenset([
    'title',
    'authors',
    'series',
    'rating',
    'tags',
    'identifier:isbn',
    'identifier:douban'
    'pubdate',
    'publisher',
    'languages',
    'comments',
  ])
  book_searcher = DoubanBookSearcher(
    api_host = DEFAULT_DOUBAN_API_HOST,
    use_cache = DEFAULT_DOUBAN_USE_CACHE,
    concurrency_size = DEFAULT_DOUBAN_CONCURRENCY_SIZE,
    result_limit = DEFAULT_DOUBAN_CONCURRENCY_SIZE
  )
  options = (
    # name, type, default, label, default, choices
    # type 'number', 'string', 'bool', 'choices'
    Option(
      'douban_api_host', 'string', DEFAULT_DOUBAN_API_HOST,
      _('豆瓣 API 地址:'),
      _('豆瓣 API 地址, 记得更换成自己的地址.')
    ),
    Option(
      'douban_result_limit', 'bool', DEFAULT_DOUBAN_RESULT_LIMIT,
      _('搜索结果展示数量上限:'),
      _('搜索结果展示数量上限, 不建议设置太大.')
    ),
    Option(
      'douban_concurrency_size', 'number', DEFAULT_DOUBAN_CONCURRENCY_SIZE,
      _('并发查询数:'),
      _('并发查询数, 太高有封 ip 风险.')
    ),
    Option(
      'douban_use_cache', 'bool', DEFAULT_DOUBAN_USE_CACHE,
      _('使用服务端缓存的数据:'),
      _('Whether to use cache of douban api server.')
    )
  )

  def get_option(self, key):
    return self.prefs.get(key, None)

  def get_option_and_update_searcher(self):
    douban_api_host = self.get_option('douban_api_host')
    concurrency_size = self.get_option('douban_concurrency_size')
    use_cache = self.get_option('douban_use_cache')
    result_limit = self.get_option('douban_result_limit')
    if douban_api_host == self.book_searcher.api_host:
      if concurrency_size == self.book_searcher.concurrency_size:
        if use_cache == self.book_searcher.use_cache:
          if result_limit == self.book_searcher.result_limit:
            return
    self.book_searcher = DoubanBookSearcher(
      use_cache = use_cache,
      api_host = douban_api_host,
      concurrency_size = concurrency_size,
      result_limit = result_limit
    )

  def get_book_url(self, identifiers):
    douban_id = identifiers.get('douban', None)
    if douban_id is not None:
      return ('douban', douban_id, f'https://book.douban.com/subject/{douban_id}/')
    
    isbn_id = identifiers.get('isbn', None)
    if isbn_id is not None:
      return ('isbn', isbn_id, f'https://book.douban.com/isbn/{isbn_id}/')

  def download_cover(
    self,
    log,
    result_queue,
    abort,
    title = None,
    authors = None,
    identifiers = {},
    timeout = 30,
    get_best_cover = False
  ):
    cached_url = self.get_cached_cover_url(identifiers)
    if cached_url is None:
      log.info('No cached cover found, running identify')
      rq = Queue()
      self.identify(
        log,
        rq,
        abort,
        title = title,
        authors = authors,
        identifiers = identifiers
      )
      if abort.is_set():
        return
      results = []
      while True:
        try:
          results.append(rq.get_nowait())
        except Empty:
          break
      results.sort(
        key = self.identify_results_keygen(title = title, authors = authors, identifiers = identifiers)
      )
      for mi in results:
        cached_url = self.get_cached_cover_url(mi.identifiers)
        if cached_url is not None:
          break
    if cached_url is None:
      log.info('No cover found')
      return
    br = self.browser
    log('Downloading cover from:', cached_url)
    try:
      cdata = br.open_novisit(cached_url, timeout = timeout).read()
      if cdata:
        result_queue.put((self, cdata))
    except:
      log.exception('Failed to download cover from:', cached_url)

  def get_cached_cover_url(self, identifiers):  # {{{
    url = None
    douban_id = identifiers.get('douban', None)
    if douban_id is None:
      isbn_id = identifiers.get('isbn', None)
      if isbn_id is not None:
        douban_id = self.cached_isbn_to_identifier(isbn_id)
    if douban_id is not None:
      url = self.cached_identifier_to_cover_url(douban_id)

    return url

  def identify(
    self,
    log,
    result_queue,
    abort,
    title = None,
    authors = None,
    identifiers = {},
    timeout = 30
  ):
    self.get_option_and_update_searcher()
    books = None
    # douban_id = identifiers.get('douban', None)
    isbn = check_isbn(identifiers.get('isbn', None))

    books = self.book_searcher.search_books(
      douban_id = None,
      isbn = isbn,
      keyword = title,
      log = log
    )
    for book in books:
      ans = self.to_metadata(book, log)
      if isinstance(ans, Metadata):
        douban_id = ans.identifiers['douban']
        if ans.isbn:
          self.cache_isbn_to_identifier(ans.isbn, douban_id)
        if ans.cover:
          self.cache_identifier_to_cover_url(douban_id, ans.cover)
        self.clean_downloaded_metadata(ans)
        result_queue.put(ans)

  def to_metadata(self, book, log):
    if book:
      title = book.get('title', None)
      author = book.get('author', [])
      douban_id = book.get('id', None)
      if douban_id is None or title is None:
        return None
      m = Metadata(title, author)
      m.identifiers = { 'douban': douban_id }
      m.series = book.get('series', '')

      rating = book.get('rating', None)
      if rating is not None:
        value = rating.get('value', 0)
        m.rating = value / 2
      
      m.tags = book.get('labels', '')
      m.isbn = book.get('isbn', '')

      pubdate = book.get('publishDate', None)
      if pubdate:
        try:
          if re.compile('^\\d{4}-\\d+$').match(pubdate):
              m.pubdate = datetime.strptime(pubdate, '%Y-%m')
          elif re.compile('^\\d{4}-\\d+-\\d+$').match(pubdate):
              m.pubdate = datetime.strptime(pubdate, '%Y-%m-%d')
        except:
            log.error('Failed to parse pubdate %r' % pubdate)

      m.publisher = book.get('publish', '')
      m.languages = ['zh_CN']
      
      m.cover = book.get('cover_url', None)

      subtitle = book.get('subtitle', '').strip()
      if subtitle != '':
        subtitle = '副标题: ' + subtitle
      original_title = book.get('original_title', '').strip()
      if original_title != '':
        original_title = '原标题: ' + original_title
      translators = book.get('translator', [])
      if len(translators) > 0:
        translators = '译者: ' +', '.join(translators)
      else:
        translators = None
      producer = book.get('producer', '').strip()
      if producer != '':
        producer = '出品方: ' + producer
      book_intro = book.get('book_intro', None)
      author_intro = book.get('author_intro', None)
      catalog = '\n'.join(book.get('catalog', []))
      description = '\n\n'.join(filter(lambda x: x is not None, [
        subtitle, original_title, translators, book_intro, author_intro, catalog
      ]))
      print(description)
      m.comments = description

      m.url = book.get('url', None)

      # It DON'T support user metadata....
      # m.set_user_metadata('#subtitle', {
      #   'name': '#subtitle',
      #   'datatype': 'text',
      #   'is_multiple': False,
      #   '#value#': book.get('subtitle', '')
      # })
      # m.set_user_metadata('#translators', {
      #   'name': '#translators',
      #   'datatype': 'text',
      #   'is_multiple': {
      #     'list_to_ui': ', ',
      #   },
      #   '#value#': book.get('translator', [])
      # })
      # m.set_user_metadata('#original_title', {
      #   'name': '#original_title',
      #   'datatype': 'text',
      #   'is_multiple': False,
      #   '#value#': book.get('original_title', [])
      # })
      # m.set_user_metadata('#producer', {
      #   'name': '#producer',
      #   'datatype': 'text',
      #   'is_multiple': False,
      #   '#value#': book.get('producer', [])
      # })

      log.info('parsed book', book)
      return m


if __name__ == "__main__":
  # To run these test use: calibre-debug -e ./__init__.py
  from calibre.ebooks.metadata.sources.test import (
    test_identify_plugin, title_test, authors_test
  )
  test_identify_plugin(
    DoubanBookAPI.name, [
      (
        {
          # 'identifiers': {
          #   'isbn': '9787505396814',
          #   'douban': ''
          # },
          'title': 'DOOM启世录'
        }, [
          title_test('DOOM启世录', exact = True),
          authors_test(['[美] 大卫·卡什诺'])
        ]
      ), 
      (
          {
          'title': '政治的逻辑'
        }, [
          title_test('政治的逻辑', exact = True),
          authors_test(['王沪宁', '林尚立', '孙关宏'])
        ])
    ]
  )
