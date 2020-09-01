const { KSoftClient } = require('@ksoft/api');
const { ksoftToken } = require('../token.json');
const ksoft = new KSoftClient(ksoftToken);
module.exports = {
    name: 'meme',
    description: 'Devuelve un meme .',
    cooldown: 5,
    async execute(message) {
        const meme = await ksoft.images.meme();
        const memeEmbed = { // Crea un embed inicial para mostrar la ayuda.
            color: 0xff9900,
            title: meme.post.title,
            url: meme.post.link,
            image: {
                url: meme.url,
            },
            footer: {
                text: `${meme.post.subreddit} | 👍 ${meme.post.upvotes} | 👎 ${meme.post.downvotes} | 💬 ${meme.post.comments}`,
            },
        };
        message.channel.send({ embed: memeEmbed });
    },
};
