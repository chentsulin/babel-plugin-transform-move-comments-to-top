import path from 'path';
import fs from 'fs';
import assert from 'assert';
import * as babel from 'babel-core';
import plugin from '../src/index';

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

describe('move comments to top of the file', () => {
  const fixturesDir = path.join(__dirname, 'fixtures');

  fs.readdirSync(fixturesDir).map((caseName) => {
    it(`should ${caseName.split('-').join(' ')}`, () => {
      const fixtureDir = path.join(fixturesDir, caseName);
      const actual     = babel.transformFileSync(
        path.join(fixtureDir, 'actual.js'),
        {
          plugins: [plugin],
        }
      ).code;
      const expected = fs.readFileSync(path.join(fixtureDir, 'expected.js')).toString();

      assert.equal(trim(actual), trim(expected));
    });
  });
});
