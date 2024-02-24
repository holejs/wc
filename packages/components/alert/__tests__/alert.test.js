'use strict';

const alert = require('..');
const assert = require('assert').strict;

assert.strictEqual(alert(), 'Hello from alert');
console.info('alert tests passed');
