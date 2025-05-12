import Files from '../../lib/Files';

const Directory = (directory) => {
  if (!directory) return { path: '', files: {} };

  let path = directory.toLowerCase().replaceAll('../', '').replaceAll('./', '');
  if (path.startsWith('/')) path = path.replace('/', '');
  if (path.endsWith('/')) path = path.slice(0, -1);

  const filter = Object.keys(Files)
    .filter((r) => r.toLowerCase().startsWith('../../../' + path));

  let files = {};
  for (const file of filter) {
    const name = file
      .toLowerCase()
      .replace('../../../' + path + '/', '')
      .split('.')[0];

    files[name] = Files[file];
  }

  files = Object.fromEntries(
    Object.entries(files).sort((a, b) => {
      const depthA = a[0].split('/').length;
      const depthB = b[0].split('/').length;
  
      if (depthA !== depthB) return depthA - depthB;
  
      const endsWithMainA = a[0].toLowerCase().endsWith('main');
      const endsWithMainB = b[0].toLowerCase().endsWith('main');
  
      return (endsWithMainB ? 1 : 0) - (endsWithMainA ? 1 : 0);
    })
  );

  return { path, files };
};

export default Directory;