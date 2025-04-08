import { Directory } from '../Config';
import LoadComponent from '../Components/Load';

const Load = (config) => {
  const directory = Directory(config.dir);

  let Result = {};
}

export {
  Load
};

// [
//   {
//     path: '/',
//     element: <RootLayout />,         // ⬅️ carregado sempre
//     children: [
//       {
//         path: 'dashboard',
//         element: <DashboardLayout />, // ⬅️ carregado se o path começar com /dashboard
//         children: [
//           {
//             path: 'settings',
//             element: <DashboardSettings /> // ⬅️ carregado apenas em /dashboard/settings
//           }
//         ]
//       }
//     ]
//   }
// ]