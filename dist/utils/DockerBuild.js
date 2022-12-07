"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
var version = require('./package.json').version;
(0, child_process_1.spawn)("docker buildx build --platform=linux/amd64,linux/arm64 . --push -t Gerald12344/".concat(process.env.PACKAGE_NAME, ":").concat(version));
