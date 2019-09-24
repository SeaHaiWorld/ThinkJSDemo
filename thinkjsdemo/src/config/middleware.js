const path = require('path');
const kcors = require('kcors');
const isDev = think.env === 'development';

module.exports = [
  {
    handle: kcors, // 处理跨域
    options: {}
  },
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: 'payload',
    options: {
      limit: '5mb'
    }
  },
  {
    handle: 'router',
    options: {
      defaultModule: 'api',
      defaultController: 'goods',
      defaultAction: 'index'
    }
  },
  'logic',
  'controller'
];
