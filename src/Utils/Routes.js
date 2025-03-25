import { Routes, Route, Navigate } from 'react-router-dom'

let Files = import.meta.glob('../../../**');

if (Object.keys(Files).find((f) => f.startsWith('../../../base-react/'))) {
  for (let f in Files) {
    if (f.startsWith('../../../base-react/')) Files[f.replace('base-react/', '')] = Files[f];
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