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

export interface Endpoint extends EventSource {
  postMessage(message: any, transfer?: Transferable[]): void;

  start?: () => void;
}

export const enum WireValueType {
  RAW = 1,
  PROXY = 2,
  THROW = 3,
  HANDLER = 4,
}

export interface RawWireValue {
  id?: MessageID;
  type: WireValueType.RAW;
  value: {};
}

export interface HandlerWireValue {
  id?: MessageID;
  type: WireValueType.HANDLER;
  name: string;
  value: unknown;
}

export type WireValue = RawWireValue | HandlerWireValue;

export type MessageID = number;

export const enum MessageType {
  GET = 10,
  SET = 11,
  APPLY = 12,
  CONSTRUCT = 13,
  ENDPOINT = 14,
  RELEASE = 15,
}

export interface GetMessage {
  id?: MessageID;
  type: MessageType.GET;
  path: string[];
}

export interface SetMessage {
  id?: MessageID;
  type: MessageType.SET;
  path: string[];
  value: WireValue;
}

export interface ApplyMessage {
  id?: MessageID;
  type: MessageType.APPLY;
  path: string[];
  argumentList: WireValue[];
}

export interface ConstructMessage {
  id?: MessageID;
  type: MessageType.CONSTRUCT;
  path: string[];
  argumentList: WireValue[];
}

export interface EndpointMessage {
  id?: MessageID;
  type: MessageType.ENDPOINT;
}

export interface ReleaseMessage {
  id?: MessageID;
  type: MessageType.RELEASE;
}

export type Message =
  | GetMessage
  | SetMessage
  | ApplyMessage
  | ConstructMessage
  | EndpointMessage
  | ReleaseMessage;
