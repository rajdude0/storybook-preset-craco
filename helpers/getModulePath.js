const { existsSync } = require('fs');
const { join } = require('path');

const JSCONFIG = 'jsconfig.json';
const TSCONFIG = 'tsconfig.json';

const getModulePath = (appDirectory) => {
  // CRA only supports `jsconfig.json` if `tsconfig.json` doesn't exist.
  let configName = '';
  if (existsSync(join(appDirectory, TSCONFIG))) {
    configName = TSCONFIG;
  } else if (existsSync(join(appDirectory, JSCONFIG))) {
    configName = JSCONFIG;
  }

  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const { baseUrl } = require(join(appDirectory, configName)).compilerOptions;
    return baseUrl ? [baseUrl] : [];
  } catch (e) {
    return [];
  }
};

module.exports = { getModulePath };
