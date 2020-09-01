const { KSoftClient } = require('@ksoft/api');
const { ksoftToken } = require('../token.json');
const ksoft = new KSoftClient(ksoftToken);
module.exports = {
    name: 'cute',
    description: 'Devuelve un imagen adorable.',
    cooldown: 5,
    async execute(message) {
        const aww = await ksoft.images.aww();
        const memeEmbed = { // Crea un embed inicial para mostrar la ayuda.
            color: 0xff9900,
            title: aww.post.title,
            url: aww.post.link,
            image: {
                url: aww.url,
            },
            footer: {
                text: `${aww.post.subreddit} | 👍 ${aww.post.upvotes} | 👎 ${aww.post.downvotes} | 💬 ${aww.post.comments}`,
            },
        };
        message.channel.send({ embed: memeEmbed });
    },
};
