import {ModelHelper} from './../src/Helpers/ModelHelper'
import {expect, assert} from 'chai';
import { RESTQueryHelper } from '../src/Helpers/RESTQueryHelper';
/// <reference types="mocha" />

describe('RESTQueryHelper', () => {

  it('should build simple top', () => {
      let queryHelper = new RESTQueryHelper();
      let expected = "?$top=5";

      assert.equal(queryHelper.BuildQuery({
          Top: 5
      }), expected);
  });
  it('should build top with skip', () => {
      let queryHelper = new RESTQueryHelper();
      let expected = "?$top=5&$skip=5";

      assert.equal(queryHelper.BuildQuery({
          Top: 5,
          Skip: 5
      }), expected);
  });
  it('should build order by', () => {
      let queryHelper = new RESTQueryHelper();
      let expected = "?$orderBy=Id";

      assert.equal(queryHelper.BuildQuery({
          OrderBy: "Id"
      }), expected);
  });
  it('should build simple filter', () => {
      let queryHelper = new RESTQueryHelper();
      let expected = "?$filter=Id eq 1";

      assert.equal(queryHelper.BuildQuery({
          Query: "Id eq 1"
      }), expected);
  });
});