import { Routes, Route, Navigate } from 'react-router-dom'

let Files = import.meta.glob('../../../../src/**');
if (Object.keys(Files).length <= 0) {
  Files = import.meta.glob('../../../src/**');
  for (let f in Files) {
    Files['../' + f] = Files[f]; 
    delete Files[f];
  }
}
console.log(Files)


const routes = [ <Route key="*" path="*" element={ <Navigate to="/" /> } /> ];

routes.push(
  <Route 
    key={ '/' }
    path={ '/' }
    element={
      <a>Page /</a>
    }
  />
)

export default (
  <Routes>
    { routes }
  </Routes>
)