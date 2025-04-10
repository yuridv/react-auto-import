import Files from '../../../lib/files';

const Directory = (directory) => {
  if (!directory) return { path: '', files: {} };

  let path = directory.toLowerCase().replaceAll('../', '').replaceAll('./', '');
  if (path.startsWith('/')) path = path.replace('/', '');
  if (path.endsWith('/')) path = path.slice(0, -1);


  const filter = Object.keys(Files)
    .filter((r) => r.toLowerCase().startsWith('../../../' + path));


  const files = {};
  for (const file of filter) {
    const name = file
      .toLowerCase()
      .replace('../../../' + path + '/', '')
      .split('.')[0];

    files[name] = Files[file];
  }

  return { path, files };
};

export default Directory;