const test = require('ava');
const { Signale } = require('signale');

/**
 * our lovely brightsole ideology is to use signale for all logging
 * set as a global variable
 *
 * This causes problems in tests, because that global isn't set, because
 * testing the `index.js` shallow `commander` wrapper is overreaching,
 * and a pain in the ass.
 *
 * So instead, we export the standard global here, and disable logging with
 * disabled: true
 */
global.runningLog = new Signale({
  disabled: true,
  scope: 'main',
});

/* also, export ava test globally to save a single line */
global.test = test;
