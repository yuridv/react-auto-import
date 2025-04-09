import config from '../defaultConfig.json';
import { Load } from './Utils/Imports';

const Config = (newConfig = {}) => {
  Object.keys(newConfig).forEach((key) => config[key] = { ...config[key], ...newConfig[key] });

  const layouts = config.Layouts || config.layouts;
  if (layouts) Load.Layouts(layouts);

  const routes = config.Routes || config.routes;
  if (routes) Load.Routes(routes, layouts);
};

export {
  Config
};

Config();