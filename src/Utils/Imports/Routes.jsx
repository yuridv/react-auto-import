import { createBrowserRouter } from 'react-router-dom';
import { Directory } from '../Functions';

import { Load as LoadComponent } from '../../Components';

const Routes = {
  list: []
};

const Load = (config) => {
  const { files } = Directory(config.dir);

  for (const file in files) {
    let path = file
      .split('/')
      .filter(p => !config.removeFromPath.includes(p) && !/^\(.*\)$/.test(p));

    if ([ 'main', 'index' ].includes(path.at(-1))) path.pop();
    if (!path.length) path[0] = config.homePath;

    if (Routes.list.find(route => route.path === path.join('/'))) {
      console.error(`[DUPLICATE ROUTE]=> There is already another route with the path equal to "${path.join('/')}" for the file "${file}"`);
      continue;
    }

    path.reduce((curr, seg, i) => {
      const r = curr.find(p => p.path === seg) || curr[curr.push({ path: seg }) - 1];

      if (i === path.length - 1) {
        r.element = <LoadComponent element={ files[file] } />;
      } else {
        r.children ??= [];
      }

      return r.children || [];
    }, Routes.list);
  }

  const RedirectHome = () => window.location.replace(config.homePath);
  Routes.list.push({ path: '*', element: <RedirectHome /> });

  console.log('1', Routes.list);
  Routes.router = createBrowserRouter(Routes.list);
};

const LoadBK = (config, layoutConfig, styleConfig) => {
  const { files } = Directory(config.dir);
  const { files: Layouts } = Directory(layoutConfig.dir);

  const router = [];

  for (const Route in files) {
    let path = Route
      .split('/');
    
    if (!path[1] && [ 'main', 'index' ].includes(path[0])) path[0] = config.homePath;

    if ([ 'main', 'index' ].includes(path.at(-1))) path.pop();

    let Layout = Object.keys(Layouts)
      .sort((a, b) => b.split('/').length - a.split('/').length)
      .find(pathname => pathname
        .split('/')
        .filter(p => ![ 'main', 'index' ].includes(p))
        .every((p, i) => p === path[i].replace(/^\(|\)$/g, ''))
      );
    
    if (!Layout) Layout = Object.keys(Layouts).find(layout => layout === layoutConfig.default);

    path = path.filter(pathname => 
      !config.removeFromPath.includes(pathname) &&
      !(pathname.startsWith('(') && pathname.endsWith(')'))
    );
    if (path.length <= 0) {
      console.error(`[ROUTE WITHOUT PATH]=> The file "${Route}" has had its path removed!`);
      continue;
    }

    if (router.find(route => route.path === path.join('/'))) {
      console.error(`[DUPLICATE ROUTE]=> There is already another route with the path equal to "/${path.join('/') === '/' ? '' : path}"`);
      continue;
    }

    router.push({
      path: path.join('/'),
      element: Layout && <LoadComponent element={ Layouts[Layout] } />,
      children: [ { index: true, element: <LoadComponent element={ files[Route] } /> } ]
    });
  }

  const RedirectHome = () => window.location.replace(config.homePath);
  router.push({ path: '*', element: <RedirectHome /> });

  Routes.router = createBrowserRouter(router);
};

export {
  Load,
  Routes
};