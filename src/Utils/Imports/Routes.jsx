import { createBrowserRouter } from 'react-router-dom';
import { Directory } from '../Functions';

import { Load as LoadComponent } from '../../Components';

const Routes = {
  list: [],
  router: null
};

const Load = (config, layoutConfig) => {
  const { files } = Directory(config.dir);
  const { files: Layouts } = Directory(layoutConfig.dir);

  console.log('[Layouts]=> ', JSON.stringify(Layouts, null, 2));

  const router = [];

  for (const route in files) {
    const path = route
      .split('/');
    
    if ([ 'main', 'index' ].includes(path[0])) path[0] = '/';

    if ([ 'main', 'index' ].includes(path.at(-1))) path.pop();

    let layout = Object.keys(Layouts)
      .map(pathname => ({
        original: pathname,
        parts: pathname
          .split('/')
          .filter(part => ![ 'main', 'index' ].includes(part))
      }))
      .sort((a, b) => b.parts.length - a.parts.length)
      .find(pathname => pathname.parts.every((part, i) => part === path[i]))
      ?.original;
    
    if (!layout) layout = Object.keys(Layouts).find(layout => layout === layoutConfig.default.toLowerCase());
  
    console.log(`[${path.join('/')}]=> `, layout);

    router.push({
      path: path.join('/'),
      element: <LoadComponent element={ Layouts[layout] } />,
      children: [ { index: true, element: <LoadComponent element={ files[route] } /> } ]
    });
  }

  // console.log('[Routes]=> ', JSON.stringify(router, null, 2));

  const RedirectHome = () => window.location.replace(config.homePath);
  router.push({ path: '*', element: <RedirectHome /> });

  Routes.router = createBrowserRouter(router);
};

export {
  Load,
  Routes
};