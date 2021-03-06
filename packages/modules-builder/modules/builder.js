const { forEachObjIndexed } = require('ramda');
const compileAccordingToInfo = require('./compiler');


const createBuilder = infoToCompile =>
  () => forEachObjIndexed(compileAccordingToInfo, infoToCompile);


module.exports = createBuilder;
