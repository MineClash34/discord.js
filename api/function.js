const encode = require("encode-3986");
module.exports = {
        // Get messages from channel
    "getMessages": (channelId, limit = 100) => require("./apiCall.js")(`/channels/${channelId}/messages?limit=${limit}`),

        // Send a message in a channel
    "sendMessage": (channelId, message, tts) => require("./apiCall.js")(`/channels/${channelId}/messages`, { content: message, tts: !!tts, nonce: Math.floor(Math.random() * 1000000) }, 'POST'),

        // Edit a message in a channel
    "editMessage": (channelId, messageId, newMessage) => require("./apiCall.js")(`/channels/${channelId}/messages/${messageId}`, { content: newMessage }, 'PATCH'),

        // Delete a message from a channel
    "deleteMessage": (channelId, messageId) => require("./apiCall.js")(`/channels/${channelId}/messages/${messageId}`, null, 'DELETE'),

        // Get specific message
    "getMessage": async (channelId, messageId) => require("./apiCall.js")(`/channels/${channelId}/messages?limit=100`).then((msgs) => { if (msgs === undefined) {console.log("SelfBot ERROR : Une erreur s'est produite ! Cela peut être du à un mauvais paramètre (ID de channel / ID de message) ou une erreur chez Discord. Si l'erreur persiste vérifiez bien votre code ! (Cette erreur n'arrête pas le processus) ");} var msg = msgs.find(m => m.id === messageId); if (msg === undefined) {console.log("SelfBot ERROR : Une erreur s'est produite ! Cela peut être du à un mauvais paramètre (ID de channel / ID de message) ou une erreur chez Discord. Si l'erreur persiste vérifiez bien votre code ! (Cette erreur n'arrête pas le processus) ");} else {return msg}}),
        // React on a message
    "messageReact": (channelId, messageId, emoji) => require("./apiCall.js")(`/channels/${channelId}/messages/${messageId}/reactions/${encode(emoji)}/@me`, null, 'PUT')
}