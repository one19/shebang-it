#!/usr/bin/env node
const { Signale } = require('signale');
const program = require('commander');
const _ = require('lodash');
const { default: main } = require('./src');

/** 
 * A BIG DUMB FAKE STREAMLIKE OBJECT OF NOOPS. TO BE REMOVED ASAP
 */
const noop = () => {};
const SAFETY_STREAM = {
  write: noop,
  cursorTo: noop,
  clearLine: noop,
  moveCursor: noop,
};

const runningLog = new Signale({
  interactive: true,
  scope: 'shebang-it',
  stream: process.stdout || SAFETY_STREAM,
});

runningLog.start('Beginning process');

global._ = _;
global.runningLog = runningLog;

program
  .arguments('[inputFolder]')
  .option('-i, --input-filename [string]', 'input filename [index.js]')
  .option('-o, --output-filename [string]', 'bin output filename [-i]')
  .action((argument, options) => {
    runningLog.info('Calling main function');

    main(argument, options);

    runningLog.success('bin-shebanged the file!');
  });

program.parse(process.argv);
