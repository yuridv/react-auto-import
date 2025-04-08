import { createBrowserRouter } from 'react-router-dom';
import { Directory } from '../Config';
import LoadComponent from '../Components/Load';

const RedirectHome = () => window.location.replace('/');

const Routes = { 
  list: [],
  router: null,
};

const Load = (config) => {
  const directory = Directory(config.dir);

  const Result = [{ path: '*', element: <RedirectHome /> }];

  for (let f in directory.files) {
    let path = f.toLowerCase().replace('../../../' + directory.path + '/', '').split('.')[0];
    if (['main', 'index'].includes(path)) path = config.homePath;

    if (path.split('/').pop() !== 'main') {
      path = path.replace(new RegExp('^(' + config.removeFromPath?.join('|').toLocaleLowerCase() + ')/'), '');
    }

    if (['main', 'index'].includes(path.split('/').slice(-1)[0])) {
      path = path.split('/').slice(0, -1).join('/');
    }

    if (Result.find((r) => r.key === path)) {
      console.error(`[Routes]=> There is already another route with the path equal to "/${path}"`);
      continue;
    }

    Routes.list.push({ path });
    Result.push({ path, element: <LoadComponent element={directory.files[f]} /> });
  }

  Routes.router = createBrowserRouter(Result);
};

export {
  Load,
  Routes
};
