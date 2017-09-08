import chai from "chai";
import * as sc from "../../static/js/app2/entry";

let assert = chai.assert;

describe('App2', () => {
    it('name', () => {
        assert.strictEqual(sc.name, "app2");
    });
});