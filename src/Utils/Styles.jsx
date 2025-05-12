import { Directory } from '../Functions';

let Styles;

const Load = (config) => {
  const { files } = Directory(config.dir);
  Styles = {};
    
  for (const file in files) {
    const path = file
      .split('/')
      .filter(p => !/^\(.*\)$/.test(p));
    const last = path.pop();

    let pointer = Styles;
    for (const p of path) {
      pointer[p] = pointer[p] || {};
      pointer = pointer[p];
    }

    pointer[last] = files[file];
  }
};

export {
  Load,
  Styles
};