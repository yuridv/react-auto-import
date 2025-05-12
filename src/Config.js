import defaultConfig from '../config.json';
import { ObjectAssign } from './Functions';
import { load } from './Utils';


const Config = (newConfig = {}) => {
  const config = ObjectAssign(defaultConfig, newConfig);

  load.Routes(config);
  load.Layouts(config);
  load.Router(config);
};

export {
  Config
};

Config();