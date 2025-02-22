/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EventSource {
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: {}
  ): void;

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: {}
  ): void;
}

export interface PostMessageWithOrigin {
  postMessage(
    message: any,
    targetOrigin: string,
    transfer?: Transferable[]
  ): void;
}

export const enum PostMessageType {
  RAW = 1,
  PROXY = 2,
  THROW = 3,
  HANDLER = 4,
  GET = 5,
  SET = 6,
  APPLY = 7,
  CONSTRUCT = 8,
  ENDPOINT = 9,
  RELEASE = 10,
}


export type MessageID = number;

export type Payload = GetMessage | SetMessage | ApplyMessage | ConstructMessage | EndpointMessage | ReleaseMessage;
export type PostMessageMessage = [MessageID, Payload];

export interface Endpoint extends EventSource {
  postMessage(message: PostMessageMessage, transfer?: Transferable[]): void;

  start?: () => void;
}

export interface ExposedEndpoint extends EventSource {
  postMessage(message: [MessageID, WireValue], transfer?: Transferable[]): void;

  start?: () => void;
}

export const enum WireValueType {
  RAW = 1,
  PROXY = 2,
  THROW = 3,
  HANDLER = 4,
}

export interface RawWireValue {
  type: WireValueType.RAW;
  value: {};
}

export interface HandlerWireValue {
  type: WireValueType.HANDLER;
  name: string;
  value: unknown;
}

export type WireValue = RawWireValue | HandlerWireValue;

export interface GetMessage {
  type: PostMessageType.GET;
  path: string[];
}

export interface SetMessage {
  type: PostMessageType.SET;
  path: string[];
  value: WireValue;
}

export interface ApplyMessage {
  type: PostMessageType.APPLY;
  path: string[];
  argumentList: WireValue[];
}

export interface ConstructMessage {
  type: PostMessageType.CONSTRUCT;
  path: string[];
  argumentList: WireValue[];
}

export interface EndpointMessage {
  type: PostMessageType.ENDPOINT;
  path?: never;
}

export interface ReleaseMessage {
  type: PostMessageType.RELEASE;
  path?: never;
}