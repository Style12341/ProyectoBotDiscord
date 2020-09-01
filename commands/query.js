const WolframAlphaAPI = require('wolfram-alpha-api');
const { wolframToken } = require('../token.json');
const { prefix } = require('../config.json');
const waApi = WolframAlphaAPI(wolframToken);
module.exports = {
    name: 'query',
    description: 'Devuelve la busqueda en WolframAlpha',
    usage: '<tag>',
    cooldown: 5,
    async execute(message, args, commandName) {
        const input = message.content.slice((prefix + commandName).length).trim();
        console.log(input);
        const query = await waApi.getShort(input).then(waApi.fetchResults).then(waApi.formatResults).catch(console.error);
          message.reply(query);
    },
};