import { lazy } from 'react';

import { Directory } from '../Functions';

let Styles;

const Load = (config) => {
  const { files } = Directory(config.dir);

  Styles = {
    list: []
  };

  for (const file in files) {
    const path = file
      .split('/');

    const Style = lazy(() => files[file]());
    Styles.list.push({ name: path.join('/'), element: Style });
  }

  // console.log(JSON.stringify(Styles, null, 2));
};

export {
  Load,
  Styles
};