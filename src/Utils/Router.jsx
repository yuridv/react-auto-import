import { Element } from '../Components';

import { Routes, Layouts } from './';

let Router;

const Load = (config) => {
  Router = [];

  const RedirectHome = () => window.location.replace(config.router.homePath);
  Router = [ { path: '*', element: <RedirectHome /> } ];

  for (const file of Routes) {
    const path = file.path
      .split('/')
      .filter(p => !/^\(.*\)$/.test(p));

    if ([ 'main', 'index' ].includes(path.at(-1))) path.pop();
    if (!path.length) path[0] = '/';

    if (Router.find(r => r.path === path.join('/'))) {
      console.error(`[DUPLICATE ROUTE]=> There is already another route with the path equal to "${path.join('/')}" for the file "${file}"`);
      continue;
    }

    console.log(file.path, JSON.stringify(Layouts, 0, 2));

    let Layout = [ ...Layouts ]
      .sort((a, b) => b.path.split('/').length - a.path.split('/').length)
      .find((item) => item.path === file.path || file.path.includes(item.path.replace(/\/(main|index)/g, '')));

    if (!Layout && config.layouts.default) Layout = Layouts.find((layout) => layout.path === config.layouts.default);

    Router.push({
      path: path.join('/'),
      element: Layout && <Element element={ Layout.element } style={ Layout.style } />,
      children: [ { index: true, element: <Element element={ file.element } style={ file.style } /> } ]
    });
  }
};

export {
  Load,
  Router
};