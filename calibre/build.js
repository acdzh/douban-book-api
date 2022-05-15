const path = require('path');
const AdmZip = require('adm-zip');

const zip = new AdmZip();
zip.addLocalFolder(__dirname);

zip.writeZip(path.join(__dirname, '../dist/Douban Book API.zip'));