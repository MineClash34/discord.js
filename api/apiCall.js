const fetch = require("node-fetch");
var rep;
module.exports = function apiCall (apiPath, body, method = 'GET') {
    var connect = require("./connect.js");
    try {
        return fetch(connect["apiPrefix"] + apiPath, {
            timeout: 4000,
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                Accept: '*/*',
                'Accept-Language': 'en-GB',
                Authority: 'discordapp.com',
                Authorization: connect["autHeader"],
                'Content-Type': 'application/json',
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.301 Chrome/56.0.2924.87 Discord/1.6.15 Safari/537.36'
            },
        method
        })
        .then(async res =>  {
            try {
            var response = await res.json()
            //console.log(response)
            if (response.message && response.message.includes("Unauthorized")) {console.log("SelfBot ERROR : Token incorrect !"); return process.exit(1)};
            if (response.limit && response.limit.includes("int value should be less than or equal to 100.")) {console.log("SelfBot ERROR : Valeur incorrect (Supérieur à 100) !"); return process.exit(1)};
            if (response.message && response.message.includes("Unknown Channel")) {console.log("SelfBot ERROR : Channel incorrect !"); return process.exit(1)};
            return response;
            } catch (e) {
                return;
            }
        })
    } catch (e) {
        return;
    }
}