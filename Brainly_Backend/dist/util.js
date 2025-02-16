"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashGenerator = hashGenerator;
function hashGenerator() {
    const options = "fjeivhqocbyzvrtm123456789";
    const len = options.length;
    let ans = "";
    for (let i = 0; i < 10; i++) {
        ans += options[Math.floor(Math.random() * len)];
    }
    return ans;
}
