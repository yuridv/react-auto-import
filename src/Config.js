import defaultConfig from '../defaultConfig.json';
import { ObjectAssign } from './Utils/Functions';
import { Load } from './Utils/Imports';

const Config = (newConfig = {}) => {
  const config = ObjectAssign(defaultConfig, newConfig);

  Load.Styles(config.styles);
  Load.Routes(config.routes);
};

export {
  Config
};

Config();