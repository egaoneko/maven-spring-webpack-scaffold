/* global describe */

import chai from "chai";
import * as sc from "../static/js/entry";

let assert = chai.assert;

describe('Main', () => {
    it('Hello', () => {
        assert.strictEqual(sc.hello, "Hello");
    });
});