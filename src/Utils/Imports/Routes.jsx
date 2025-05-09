import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { Styles } from './';
import { Directory } from '../Functions';

let Routes;

const Load = (config) => {
  const { files } = Directory(config.dir);

  console.log('[Styles]=> ', Styles.list[0].element);


  const RedirectHome = () => window.location.replace(config.homePath);

  Routes = {
    list: [],
    router: [ { path: '*', element: <RedirectHome /> } ]
  };

  for (const file in files) {
    const path = file
      .split('/')
      .filter(p => !config.removeFromPath.includes(p) && !/^\(.*\)$/.test(p));

    if ([ 'main', 'index' ].includes(path.at(-1))) path.pop();
    if (!path.length) path[0] = '/';

    if (Routes.router.find(route => route.path === path.join('/'))) {
      console.error(`[DUPLICATE ROUTE]=> There is already another route with the path equal to "${path.join('/')}" for the file "${file}"`);
      continue;
    }

    const Page = lazy(() => files[file]());

    path.reduce((curr, seg, i) => {
      const r = curr.find(p => p.path === seg) || curr[curr.push({ path: seg }) - 1];

      if (i === path.length - 1) {
        r.element = <Page />;
      } else {
        r.children ??= [];
      }

      return r.children || [];
    }, Routes.list);


    Routes.router.push({
      path: path.join('/'),
      element: null, // LAYOUT
      children: [ { index: true, element: <Page style={ Styles.list[0].element }/> } ]
    });
  }

  Routes.router = createBrowserRouter(Routes.router);

  console.log(Routes);
};

export {
  Load,
  Routes
};

/* 
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
 */