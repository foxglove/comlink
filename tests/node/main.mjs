import { Worker } from "worker_threads";
import * as Comlink from "../../dist/esm/comlink.mjs";
import nodeEndpoint from "../../dist/esm/node-adapter.mjs";
import { expect } from "chai";

describe("node", () => {
  describe("Comlink across workers", function () {
    beforeEach(function () {
      this.worker = new Worker("./tests/node/worker.mjs");
    });

    afterEach(function () {
      this.worker.terminate();
    });

    it("can communicate", async function () {
      const proxy = Comlink.wrap(nodeEndpoint(this.worker));
      expect(await proxy(1, 3)).to.equal(4);
    });

    it("can tunnels a new endpoint with createEndpoint", async function () {
      const proxy = Comlink.wrap(nodeEndpoint(this.worker));
      const otherEp = await proxy[Comlink.createEndpoint]();
      const otherProxy = Comlink.wrap(otherEp);
      expect(await otherProxy(20, 1)).to.equal(21);
    });
  });

  describe("Comlink across workers (wrapped object)", function () {
    beforeEach(function () {
      this.worker = new Worker("./tests/node/worker-obj.mjs");
    });

    afterEach(function () {
      this.worker.terminate();
    });

    it("can communicate", async function () {
      const proxy = Comlink.wrap(nodeEndpoint(this.worker));
      for (let i = 0; i < 10; i++) {
        expect(await proxy.add(1, i)).to.equal(1 + i);
        expect(await proxy.mult(1, i)).to.equal(1 * i);
      }
    });

    it("can tunnels a new endpoint with createEndpoint", async function () {
      const proxy = Comlink.wrap(nodeEndpoint(this.worker));
      const otherEp = await proxy[Comlink.createEndpoint]();
      const otherProxy = Comlink.wrap(otherEp);
      for (let i = 0; i < 10; i++) {
        expect(await otherProxy.add(1, i)).to.equal(1 + i);
        expect(await otherProxy.mult(1, i)).to.equal(1 * i);
      }
    });
  });
});
