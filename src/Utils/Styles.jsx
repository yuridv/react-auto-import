import { Directory } from '../Functions';

let Styles;

const Load = (config) => {
  const { files } = Directory(config.dir);
  Styles = {};
    
  for (let file in files) {
    let path = file
      .split('/')
      .filter(p => !/^\(.*\)$/.test(p));

    let last = path.pop();
    let pointer = Styles;

    for (let p of path) {
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