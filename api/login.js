module.exports = function (token) {
    var info = require("./connect.js")
    if (info["autHeader"] === "token") info["autHeader"] = token;
}