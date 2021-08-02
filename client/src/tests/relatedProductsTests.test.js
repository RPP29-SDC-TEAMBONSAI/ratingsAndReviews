import React from 'react';
import {shallow} from 'enzyme';
import helper from './helper-functions/rpHelpers.js';
import exampleData from './RelatedProducts/exampleData.jsx';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import RelatedProducts from './RelatedProducts/RelatedProducts.jsx';
import {renderer} from 'react-test-renderer';

// describe('RelatedProducts', () => {
//   describe('getOutfitData', () => {})
// })