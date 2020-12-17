"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalError = void 0;
const internalError = (err, req, res, next) => {
    // handle error here
    console.log(`Internal error ${err}`);
    res.render('error', {
        title: 'Error Status 500',
        message: 'Internal server error :('
    });
};
exports.internalError = internalError;
