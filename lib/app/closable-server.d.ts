/// <reference types="node" />
import { Server } from "http";
import Logger from "../util/logger";
export declare class ClosableServer extends Server {
    closing: boolean;
    logg: Logger;
    private readonly sockets;
    constructor();
    close(callback?: (err?: Error) => void): this;
}
export default ClosableServer;
