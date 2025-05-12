import defaultConfig from '../config.json';
import { ObjectAssign } from './Functions';
import { load } from './Utils';


const Config = (newConfig = {}) => {
  const config = ObjectAssign(defaultConfig, newConfig);

  load.Routes(config.routes);
  load.Styles(config.styles);
};

export {
  Config
};

Config();