
module.exports.defaultHttpAgent = new http.Agent({
    keepAlive: true,
    maxSockets: 5
});

module.exports.defaultHttpsAgent = new https.Agent({
    keepAlive: true,
    maxSockets: 5
});