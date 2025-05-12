import { Directory } from '../Functions';

let Layouts;

const Load = (config) => {
  const { files } = Directory(config.layouts.dir);
  const { files: Styles } = Directory(config.layouts.styles);
  Layouts = [];

  for (const file in files) {
    const style = Object.keys(Styles)
      .find((item) => item === file);

    if (!style && !config.logs.disableWarnings) console.warn('[Layouts]=> style not found for layout: ', file);

    Layouts.push({ 
      path: file, 
      element: files[file],
      style: Styles[style]
    });
  }
};

export {
  Load,
  Layouts
};