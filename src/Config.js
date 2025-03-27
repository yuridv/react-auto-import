import { Load as Routes } from './Utils/Routes'
// import { Load as Layouts } from './Utils/Layouts'

const Config = (newConfig = {}) => {
  let config = {
    Routes: {
      dir: '/src/routes',
      defaultPath: '/',
      removeFromPath: [ 'default', 'public', 'private' ]
    },
    Layouts: {
      dir: '/src/layouts/',
      default: 'src/layouts/default.jsx',
    },
    Styles: {
      dir: '/src/assets/css/'
    }
  }

  Object.keys(newConfig).forEach((key) => config[key] = { ...config[key], ...newConfig[key] });

  let layouts = config.Layouts || config.layouts;
  // if (layouts) Layouts(layouts);

  let routes = config.Routes || config.routes;
  if (routes) Routes(routes);
}

const Files = import.meta.glob([
  '../../../**/*.{jsx,module.css,png,jpg,jpeg,gif,svg,webp,avif}',
  '!../../../node_modules/**', 
  '!../../../build/**', 
  '!../../../dist/**'
]);

const Directory = (directory) => {
  let path = directory.toLowerCase().replaceAll('../', '').replaceAll('./', '');
  if (path.startsWith('/')) path = path.replace('/', '');

  let filter = Object.keys(Files)
    .filter((r) => r.toLowerCase().startsWith('../../../' + path));

  let files = {};
  for (let f of filter) files[f] = Files[f];

  return { path, files }
}

export {
  Files,
  Config,
  Directory
};