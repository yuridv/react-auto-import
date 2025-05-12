import { lazy } from 'react';
import { Directory } from '../Functions';

let Routes;

const Load = (config) => {
  const { files } = Directory(config.dir);
  Routes = [];

  for (const file in files) {
    const path = file
      .split('/')
      .filter(p => !/^\(.*\)$/.test(p));
      
    if ([ 'main', 'index' ].includes(path.at(-1))) path.pop();
    if (!path.length) path[0] = '/';

    if (Routes.find(r => r.path === path.join('/'))) {
      console.error(`[DUPLICATE ROUTE]=> There is already another route with the path equal to "${path.join('/')}" for the file "${file}"`);
      continue;
    }

    path.reduce((curr, seg, i) => {
      const r = curr.find(p => p.path === seg) || curr[curr.push({ path: seg, dir: file }) - 1];

      if (i === path.length - 1) {
        const Element = lazy(() => files[file]());
        r.element = <Element />;
      } else {
        r.children ??= [];
      }

      return r.children || [];
    }, Routes);
  }
};

export {
  Load,
  Routes
};