const Files = import.meta.glob([
  '../../../**/*.{jsx,module.css,png,jpg,jpeg,gif,svg,webp,avif}',
  '!../../../node_modules/**', 
  '!../../../build/**', 
  '!../../../dist/**'
]);
console.log(Files)

let Configuration = {};
const Config = (config = {}) => {
  Configuration = config;
}



export {
  Files,
  Config,
  Configuration
};