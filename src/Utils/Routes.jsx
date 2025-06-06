import { Directory } from '../Functions';

let Routes;

const Load = (config) => {
  const { files } = Directory(config.routes.dir);
  const { files: Styles } = Directory(config.routes.styles);
  Routes = [];

  for (const file in files) {
    const style = Object.keys(Styles)
      .find((item) => item === file);

    if (!style && !config.logs.disableWarnings) console.warn('[Routes]=> style not found for route: ', file);

    Routes.push({ 
      path: file, 
      element: files[file],
      style: Styles[style]
    });
  }
};

export {
  Load,
  Routes
};