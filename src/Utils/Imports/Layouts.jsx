// import { Directory } from '../Functions';

// const Layouts = {
//   list: []
// };

// const Load = (config) => {
//   const { files, path } = Directory(config.dir);

//   for (const file in files) {
//     const parts = file
//       .split('/');

//     const element = `Layout - ${parts.join('/')}`;
//     // const element = files[file];

//     convertList(Layouts.list, parts, element);
//     convertObj(Layouts, parts, element);
//   }

//   // console.log('[Layouts]=> ', JSON.stringify(Layouts, null, 2));
// };

// const convertObj = (obj, parts, element) => {
//   const last = parts.pop();
//   let current = obj;

//   for (const part of parts) {
//     current[part] = current[part] || {};
//     current = current[part];
//   }

//   current[last] = element;
// };

// const convertList = (list, parts, element) => {
//   let current = list;

//   for (let i = 0; i < parts.length; i++) {
//     let existing = current.find((r) => r.path === parts[i]);

//     if (!existing) {
//       existing = { path: parts[i], children: [] };

//       if (!parts[i + 1]) {
//         delete existing.children;
//         existing.element = element;
//       }
//       if ([ 'index', 'main' ].includes(parts[ i + 1 ])) {
//         existing.element = element;
//         i++;
//       }

//       current.push(existing);
//     }

//     current = existing.children;
//   }
// };

const Load = () => {};
const Layouts = {};

export {
  Load,
  Layouts
};