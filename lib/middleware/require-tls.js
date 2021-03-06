"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
function requireTLS() {
    return async function requireTLS(next) {
        const socket = this.request.socket;
        if (socket.encrypted)
            return next();
        if (this.get("x-forwarded-proto") === "https")
            return next();
        if (process.env.NODE_ENV === "development")
            return next();
        throw new TlsRequired();
    };
}
exports.default = requireTLS;
/* tslint:disable-next-line: variable-name */
const TlsRequired = errors_1.ServiceError.define({
    status: 403,
    error: "tls_required",
    message: "TLS is required to connect",
});
//# sourceMappingURL=require-tls.js.map