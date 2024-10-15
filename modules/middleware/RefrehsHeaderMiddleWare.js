"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Middleware to add the Refresh header to every response
var refreshHeaderMiddleware = function (req, res, next) {
    // Set the Refresh header to instruct the browser to refresh the page every 3 seconds
    res.setHeader('Refresh', '3');
    // Continue with the next middleware or route handler
    next();
};
//export the module
exports.default = refreshHeaderMiddleware;
