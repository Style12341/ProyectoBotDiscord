const { KSoftClient } = require('@ksoft/api');
const { ksoftToken } = require('../token.json');
const ksoft = new KSoftClient(ksoftToken);
module.exports = {
    name: 'wikihow',
    description: 'Devuelve un articulo de wikihow',
    cooldown: 5,
    category: 'Images',
    async execute(message) {
        const wikiH = await ksoft.images.wikihow();
        const wikihowEmbed = { // Crea un embed inicial para mostrar la ayuda.
            color: 0xff9900,
            title: wikiH.article.title,
            url: wikiH.article.link,
            image: {
                url: wikiH.url,
            },
            footer: {
                text: 'Powered by KSoft.Si.',
            },
        };
        message.channel.send({ embed : wikihowEmbed });
    },
};