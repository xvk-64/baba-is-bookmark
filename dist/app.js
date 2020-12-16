"use strict";
const express = require("express");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const errors_1 = require("./middleware/errors");
module.exports = (port) => {
    const app = express();
    if (port) {
        console.log(`Setting port to ${port}`);
        app.set('port', port);
    }
    // Security
    app.use(helmet());
    app.use(RateLimit({
        // 10 minutes
        windowMs: 10 * 60 * 1000,
        // 1000 requests per 10 mins
        max: 1000
    }));
    app.set('view engine', 'pug');
    app.set('views', '/views');
    app.enable('trust proxy');
    // Routing
    app.get("*", (req, res, next) => {
        next();
    });
    app.use((req, res, next) => {
        res.send("hello");
    });
    app.use(errors_1.internalError);
    return app;
};
