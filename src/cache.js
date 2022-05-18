const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

// #region 初始化数据库文件夹
const CACHE_DIR = process.env.CACHE_DIR || path.join(__dirname, '../.cache');
const CACHE_DB_PATH = require('path').join(CACHE_DIR, 'books.sqlite');
console.log(CACHE_DIR);
try {
  require('fs').mkdirSync(CACHE_DIR, { recursive: true });
} catch(err) {
  console.error('create cache dir failed.');
  process.exit(1);
}
// #endregion

// #region init cache db
let IS_DB_INITIALIZED = false;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: CACHE_DB_PATH,
  // logging: console.log
});

const SearchResult = sequelize.define('search_result', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  result: {
    type: DataTypes.JSON,
  }
}, {
  tableName: 'search_results',
});

const Book = sequelize.define('book', {
  douban_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  info: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, {
  tableName: 'books',
});

const Isbn = sequelize.define('isbn', {
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  douban_id: {
    type: DataTypes.STRING,
    allowNull: true,
    foreignKey: true,
  },
}, {
  tableName: 'isbns',
});

// Book.hasMany(Isbn, { foreignKey: 'douban_id' });
// Isbn.belongsTo(Book, { foreignKey: 'douban_id' });


(async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  IS_DB_INITIALIZED = true;
  console.log('cache db initialized.');
})();
// #endregion

async function getSearchResultFromCache(text) {
  if(!IS_DB_INITIALIZED) {
    return null;
  }
  const result = await SearchResult.findOne({
    where: { text },
  });
  if (!result) return null;
  if (!result.result) {
    await SearchResult.destroy({
      where: { text },
    });
    return null;
  }
  return result.result;
}

async function updateSearchResultToCache(keyword, result) {
  if(!IS_DB_INITIALIZED) return;
  const searchResult = await SearchResult.findOne({
    where: { text: keyword },
  });
  if (searchResult) {
    searchResult.result = result;
    await searchResult.save();
  } else {
    await SearchResult.create({
      text: keyword,
      result,
    });
  }
}

async function getBookInfoFromCacheById(douban_id) {
  if(!IS_DB_INITIALIZED) return null;
  const result = await Book.findOne({ where: { douban_id } });
  if (!result) return null;
  try {
    return result.info;
  } catch (err) {
    await Book.destroy({
      where: { douban_id },
    });
    await Isbn.destroy({
      where: { douban_id },
    });
    return null;
  }
}

async function updateBookInfoToCacheById(douban_id, info) {
  if(!IS_DB_INITIALIZED) return;
  const book = await Book.findOne({ where: { douban_id } });
  if (book) {
    book.info = info;
    await book.save();
  } else {
    await Book.create({
      douban_id,
      info,
    });
  }
}

async function getBookInfoFromCacheByIsbn(isbn) {
  if(!IS_DB_INITIALIZED) return null;
  const result = await Isbn.findOne({ where: { isbn } });
  if (!result) return null;
  if (!result.douban_id) {
    await Isbn.destroy({ where: { isbn } });
    return null;
  }
  return await getBookInfoFromCacheById(result.douban_id);
}

async function updateBookInfoToCacheByIsbn(isbn, info) {
  if(!IS_DB_INITIALIZED) return;
  console.log(isbn, info);
  const { id: douban_id } = info;
  if (!douban_id) return;
  await updateBookInfoToCacheById(douban_id, info);
  const isbnInfo = await Isbn.findOne({ where: { isbn } });
  if (isbnInfo) {
    isbnInfo.douban_id = douban_id;
    await isbnInfo.save();
  } else {
    await Isbn.create({
      isbn,
      douban_id,
    });
  }
}

module.exports = {
  CACHE_DB_PATH,
  getSearchResultFromCache,
  updateSearchResultToCache,
  getBookInfoFromCacheById,
  updateBookInfoToCacheById,
  getBookInfoFromCacheByIsbn,
  updateBookInfoToCacheByIsbn,
};