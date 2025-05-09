const ObjectAssign = (target, source, config = {}) => {
  for (const key in source) {
    const keyLower = key.toLowerCase();

    if (Array.isArray(source[key])) {
      source[keyLower] = source[key].map(item => item.toLowerCase());
    } else if (source[key] instanceof String) {
      source[keyLower] = source[key].toLowerCase();
    } else {
      source[keyLower] = source[key];
    }
  }

  for (const key in target) {
    const sourceVal = source && source[key];

    if (target[key] instanceof Object && !Array.isArray(target[key])) {
      config[key] = ObjectAssign(target[key], sourceVal);
    } else {
      config[key] = sourceVal || target[key];
    }
  }

  return config;
};

export default ObjectAssign;