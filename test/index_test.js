import './_helper';
import fs from 'fs';
import mockFs from 'mock-fs';

const { default: shebangIt } = require('../src');

test.afterEach.always(mockFs.restore);

test('appends a shebang and replaces bin file (if pre-existing exists)', t => {
  mockFs({
    bin: {
      'index.js': 'previous javascriptiums',
    },
    compiled: {
      'index.js': "var wow, it's some javascript!",
    },
  });

  shebangIt('compiled');

  const updatedContents = fs.readFileSync('bin/index.js', { encoding: 'utf8' });
  t.deepEqual(
    updatedContents,
    `#!/usr/bin/env node\nvar wow, it's some javascript!`
  );
});

test('ensures the written binfile has the required perms', t => {
  mockFs({
    bin: {
      'index.js': 'previous javascriptiums',
    },
    dist: {
      'index.js': "var wow, it's some javascript!",
    },
  });

  shebangIt();

  const { mode } = fs.statSync('bin/index.js');
  t.deepEqual(mode, 33261);
});

test('allows setting of filenames for io', t => {
  mockFs({
    bin: {
      'floob.js': 'previous javascriptiums',
    },
    compiled: {
      'pre-floob.js': "var wow, it's some javascript!",
    },
  });

  shebangIt('compiled', {
    outputFilename: 'floob.js',
    inputFilename: 'pre-floob.js',
  });

  const updatedContents = fs.readFileSync('bin/floob.js', { encoding: 'utf8' });
  t.true(updatedContents.includes('#!/usr/bin/env node'));
});

test('defaults sanely to dist & index.js for io', t => {
  mockFs({
    bin: {
      'index.js': 'previous javascriptiums',
    },
    dist: {
      'index.js': "var wow, it's some javascript!",
    },
  });

  shebangIt();

  const updatedContents = fs.readFileSync('bin/index.js', { encoding: 'utf8' });
  t.true(updatedContents.includes('#!/usr/bin/env node'));
});

test('errors if cannot find file to shebang & bin', t => {
  t.throws(() => shebangIt('froopyland'));
});
