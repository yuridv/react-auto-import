import defaultConfig from '../defaultConfig.json';
import { ObjectAssing } from './Utils/Functions';
import { Load } from './Utils/Imports';

const Config = (newConfig = {}) => {
  const config = ObjectAssing(defaultConfig, newConfig);

  Load.Routes(config.routes, config.layouts);
};

export {
  Config
};

Config();