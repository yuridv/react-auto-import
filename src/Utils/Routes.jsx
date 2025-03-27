import { Route, Navigate } from 'react-router-dom'
import { Directory } from '../Config';
import LoadComponent from '../Components/Load'

let Routes = [];
const Load = (config) => {
  let directory = Directory(config.dir);
  
  Routes = [ <Route key="*" path="*" element={ <Navigate to={ config.defaultPath } /> } /> ];

  for (let f in directory.files) {
    let path = f.toLowerCase().replace('../../../' + directory.path + '/', '').split('.')[0];
    if (['main', 'index'].includes(path)) path = config.defaultPath;

    if (path.split('/').pop() !== 'main') path = path.replace(new RegExp('^(' + config.removeFromPath?.join('|').toLocaleLowerCase() + ')\/'), '');
    if (['main', 'index'].includes(path.split('/').slice(-1)[0])) path = path.split('/').slice(0, -1).join('/');

    if (Routes.find((r) => r.key === path)) {
      console.error(`[DUPLICATE ROUTE]=> There is already another route with the path equal to "/${path}"`);
      continue;
    }

    Routes.push(
      <Route 
        key={ path } 
        path={ path } 
        element={ 
          <LoadComponent 
            element={ directory.files[f] } 
          /> 
      } />
    )
  }
}

export {
  Load,
  Routes
};