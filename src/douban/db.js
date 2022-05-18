const fs = require('fs');
const path = require('path');
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('sqlite::memory:');


const CACHE_DIR = process.env.CACHE_DIR || './.cache';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();