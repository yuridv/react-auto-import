import { Routes, Load as loadRoutes } from './Routes';
import { Layouts, Load as loadLayouts } from './Layouts';
import { Router, Load as loadRouter } from './Router';

const load = {
  Routes: loadRoutes,
  Layouts: loadLayouts,
  Router: loadRouter
};

export {
  load,
  Routes,
  Layouts,
  Router
};