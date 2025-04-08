import { createBrowserRouter } from 'react-router-dom';
import { Directory } from '../Config';
import LoadComponent from '../Components/Load';


const Routes = { 
  list: [],
  router: null
};

const Load = (config) => {
  const directory = Directory(config.dir);

  for (const filePath in directory.files) {
    const parts = filePath
      .toLowerCase()
      .replace('../../../' + directory.path + '/', '')
      .split('.')[0]
      .split('/');

    let current = Routes.list;

    for (let i = 0; i < parts.length; i++) {
      let path = parts[i];

      if ([ 'main', 'index' ].includes(path)) path = '/';

      let existing = current.find((r) => r.path === path);
      if (!existing) {
        existing = { path, children: [] };
        current.push(existing);
      }

      current = existing.children;

      if (i === parts.length - 1) {
        if (existing.path === '/') {
          delete existing.path;
          delete existing.children;
          existing.index = true;
          existing.element = <LoadComponent element={ directory.files[filePath] } />;
        } else {
          existing.children.push({ index: true, element: <LoadComponent element={ directory.files[filePath] } /> });
        }
      }

    }
  }

  const RedirectHome = () => window.location.replace(config.homePath);
  Routes.list.push({ path: '*', element: <RedirectHome /> });

  console.log(JSON.stringify(Routes.list));

  Routes.router = createBrowserRouter(Routes.list);
};

export {
  Load,
  Routes
};