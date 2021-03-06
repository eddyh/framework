"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routerify_1 = require("./util/routerify");
const application_1 = require("../application");
function start(options = {}) {
    return (object) => {
        options.router = routerify_1.default(object.prototype);
        object.instance = application_1.default.start(options);
    };
}
exports.start = start;
//# sourceMappingURL=start.js.map