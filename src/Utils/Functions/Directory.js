import Files from '../../../lib/files';

const Directory = (directory) => {
  if (!directory) return { path: '', files: {} };

  let path = directory.toLowerCase().replaceAll('../', '').replaceAll('./', '');
  if (path.startsWith('/')) path = path.replace('/', '');
  if (path.endsWith('/')) path = path.slice(0, -1);


  const filter = Object.keys(Files)
    .filter((r) => r.toLowerCase().startsWith('../../../' + path));

  const files = {};
  for (const f of filter) files[f] = Files[f];

  return { path, files };
};

export default Directory;