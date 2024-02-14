import { parentPort } from "worker_threads";
import * as Comlink from "../../dist/esm/comlink.mjs";
import nodeEndpoint from "../../dist/esm/node-adapter.mjs";

const obj = {
  add: (a, b) => a + b,
  mult: (a, b) => a * b,
};

Comlink.expose(obj, nodeEndpoint(parentPort));
