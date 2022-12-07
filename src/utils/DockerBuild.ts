import { spawn } from "child_process";
const { version } = require('./package.json');

spawn(`docker buildx build --platform=linux/amd64,linux/arm64 . --push -t Gerald12344/${process.env.PACKAGE_NAME}:${version}`)

