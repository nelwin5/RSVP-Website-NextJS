import { EventEmitter } from "events";

class SSEEmitter extends EventEmitter {}

export const sseEmitter = new SSEEmitter();
