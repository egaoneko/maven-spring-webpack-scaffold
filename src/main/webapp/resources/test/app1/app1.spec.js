import chai from "chai";
import * as sc from "../../static/js/app1/entry";

let assert = chai.assert;

describe('App1', () => {
    it('name', () => {
        assert.strictEqual(sc.name, "app1");
    });

    it('module', () => {
        assert.strictEqual(sc.module, "module");
    });
});