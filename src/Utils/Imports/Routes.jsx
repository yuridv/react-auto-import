import { createBrowserRouter } from 'react-router-dom';
import { Directory } from '../Functions';

import { Load as LoadComponent } from '../../Components';

const Routes = {
  list: [],
  router: null
};

const Load = (config, layouts) => {
  const { files, path } = Directory(config.dir);
  const Layouts = Directory(layouts.dir);
  console.log(Layouts);

  for (const filePath in files) {
    const parts = filePath
      .toLowerCase()
      .replace('../../../' + path + '/', '')
      .split('.')[0]
      .split('/');
    
    const last = parts.pop();
    let current = Routes.list;

    for (const part of parts) {
      let existing = current.find((r) => r.path === part);
      if (!existing) {
        existing = { path: part, children: [] };
        current.push(existing);
      }
      
      current = existing.children;
    }

    let element =  <LoadComponent element={ files[filePath] } /> /* 'ELEMENTO' */;

    if ([ 'main', 'index' ].includes(last)) {
      current.push({ index: true, element: element });
    } else {
      current.push({ path: last, element: element });
    }
  }

  Routes.router = createBrowserRouter(Routes.list);

  // console.log('[Routes]=> ', JSON.stringify(Routes.list, null, 2));
};

export {
  Load,
  Routes
};




// const Routes = { 
//   list: [],
//   router: null
// };

// const Load = (config) => {
//   const directory = Directory(config.dir);

//   for (const filePath in directory.files) {
//     const parts = filePath
//       .toLowerCase()
//       .replace('../../../' + directory.path + '/', '')
//       .split('.')[0]
//       .split('/');

//     let current = Routes.list;

//     for (let i = 0; i < parts.length; i++) {
//       let path = parts[i];

//       if ([ 'main', 'index' ].includes(path)) path = '/';

//       let existing = current.find((r) => r.path === path);
//       if (!existing) {
//         existing = { path, children: [] };
//         current.push(existing);
//       }

//       current = existing.children;

//       if (i === parts.length - 1) {
//         if (existing.path === '/') {
//           delete existing.path;
//           delete existing.children;
//           existing.index = true;
//           existing.element = <LoadComponent element={ directory.files[filePath] } />;
//         } else {
//           existing.children.push({ index: true, element: <LoadComponent element={ directory.files[filePath] } /> });
//         }
//       }

//     }
//   }

//   const RedirectHome = () => window.location.replace(config.homePath);

//   Routes.list.push({ path: '*', element: <RedirectHome /> });

//   Routes.router = createBrowserRouter(Routes.list);
// };
