const Files = import.meta.glob([
  '../../../**/*.{jsx,module.css,png,jpg,jpeg,gif,svg,webp,avif}',
  '!../../../node_modules/**', 
  '!../../../build/**', 
  '!../../../dist/**'
]);

export default Files;