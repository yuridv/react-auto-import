import { Directory } from '../Functions';

const Layouts = {};

const Load = (config) => {
  const { files, path } = Directory(config.dir);

  for (const file in files) {
    const parts = file
      .toLowerCase()
      .replace('../../../' + path + '/', '')
      .split('.')[0]
      .split('/');

    Layouts.list = [];
    buildList(Layouts.list, parts, /* files[file] */ 'LAYOUT ELEMENTO');

    buildObj(Layouts, parts, /* files[file] */ 'LAYOUT ELEMENTO');
  }
};

const buildObj = (obj, parts, element) => {
  const last = parts.pop();
  let current = obj;

  for (const part of parts) {
    current[part] = current[part] || {};
    current = current[part];
  }

  current[last] = element;
};

const buildList = (list, parts, element) => {
  let current = list;

  for (let i = 0; i < parts.length; i++) {
    let existing = current.find((r) => r.path === parts[i]);

    if (!existing) {
      existing = { path: parts[i], children: [] };

      if (!parts[i + 1]) delete existing.children;
      if (!parts[i + 1] || (!parts[i + 2] && [ 'index', 'main' ].includes(parts[ i + 1 ]))) {
        existing.element = element;
        i++;
      }

      current.push(existing);
    }

    current = existing.children;
  }
};

export {
  Load,
  Layouts
};