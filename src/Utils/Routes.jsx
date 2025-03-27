import { Routes, Route, Navigate } from 'react-router-dom'

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