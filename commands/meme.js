const { KSoftClient } = require('@ksoft/api');

const ksoftToken = process.env.KSOFT_TOKEN;
const ksoft = new KSoftClient(ksoftToken);
module.exports = {
    name: 'meme',
    description: 'Devuelve un meme .',
    cooldown: 5,
    category: 'Images',
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
                text: `${meme.post.subreddit} | 👍 ${meme.post.upvotes} | 👎 ${meme.post.downvotes} | 💬 ${meme.post.comments} \n Powered by KSoft.Si.`,
            },
        };
        message.channel.send({ embed: memeEmbed });
    },
};
