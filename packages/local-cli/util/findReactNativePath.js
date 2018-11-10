/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict
 */

'use strict';

const path = require('path');
const fs = require('fs');
let pnp = null;

try {
  pnp = require('pnpapi');
} catch (e) {
  // Not in PnP
}

let reactNativePath = null;

function findReactNativePath(): string {
  // If in PnP, try that first.
  if (pnp) {
    return pnp.resolveToUnqualified('react-native', path.join(process.cwd(), '../'))
  }
  // By default, CLI lives inside `node_modules` next to React Native as 
  // node dependencies are flattened
  if (fs.existsSync(path.join(__dirname, '../../react-native'))) {
    return '../../react-native';
  }
  // Otherwise, we assume it's within React Native `node_modules`
  return '../../../';
}

module.exports = (str: string) => {
  if (reactNativePath === null) {
    reactNativePath = findReactNativePath();
  }
  return path.join(reactNativePath, str);
};
