const mysql = require('think-model-mysql');

module.exports = {
  handle: mysql,
  database: 'think',
  prefix: 'think_',
  encoding: 'utf8mb4',
  host: '192.168.232.129',
  port: '3306',
  user: 'yang',
  password: 'yang',
  dateStrings: true
};
