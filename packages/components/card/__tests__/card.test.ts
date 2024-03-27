'use strict';

const card = require('..');
const assert = require('assert').strict;

assert.strictEqual(card(), 'Hello from card');
console.info('card tests passed');
