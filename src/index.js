const fs = require('fs');
const signale = require('signale');

/**
 * Tries to copy a compiled file into ./bin with exec perms and a node shebang
 *
 * @param {string} [targetFolder=dist] - file containing the compiled file
 * @param {Object} options - optional file io properties
 * @param {string} [options.inputFilename=index.js] - compiled code filename
 * @param {string} [options.outputFilename=inputFilename] - final bin filename
 */
module.exports.default = (targetFolder = 'dist', options = {}) => {
  let fileContents;
  const {
    inputFilename = 'index.js',
    outputFilename = inputFilename,
  } = options;

  try {
    runningLog.pending('Reading compiled file contents');
    fileContents = fs.readFileSync(`${targetFolder}/${inputFilename}`, {
      encoding: 'utf8',
    });
  } catch (error) {
    runningLog.fatal('Failed to read compiled file');
    throw error;
  }

  try {
    fs.unlinkSync(`bin/${outputFilename}`);
  } catch (error) {
    signale.warn(`Unable to clear ./bin/${outputFilename}`);
  }

  try {
    fs.mkdirSync('bin');
  } catch (_) {
    /* eslint-disable-line no empty */
  }

  try {
    fs.writeFileSync(
      `bin/${outputFilename}`,
      `#!/usr/bin/env node\n${fileContents}`,
      {
        mode: '0755',
      }
    );
  } catch (error) {
    runningLog.fatal(`Unable to copy stuff into ./bin/${outputFilename}`);
    throw error;
  }
};
