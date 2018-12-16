"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path_1 = require("path");
exports.app = express();
exports.app.use(express.static(path_1.join(__dirname, "public")));
exports.app.get("/", (req, res) => {
    res.redirect("index.html");
});
const port = process.env.PORT || 4000;
exports.app.listen(port, () => "Server started at " + port);
