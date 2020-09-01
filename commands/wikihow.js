const { KSoftClient } = require('@ksoft/api');
const ksoftToken = process.env.KSOFT_TOKEN;
const ksoft = new KSoftClient(ksoftToken);
module.exports = {
    name: 'wikihow',
    description: 'Devuelve un articulo de wikihow',
    cooldown: 5,
    async execute(message) {
        const wikiH = await ksoft.images.wikihow();
        const wikihowEmbed = { // Crea un embed inicial para mostrar la ayuda.
            color: 0xff9900,
            title: wikiH.article.title,
            url: wikiH.article.link,
            image: {
                url: wikiH.url,
            },
        };
        message.channel.send({ embed : wikihowEmbed });
    },
};