import { Routes, Route, Navigate } from 'react-router-dom'

let Files = import.meta.glob([
  '../../../../**/*.{jsx,module.css,png,jpg,jpeg,gif,svg,webp,avif}',
  '!../../../../node_modules/**', 
  '!../../../../build/**', 
  '!../../../../dist/**'
]);
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