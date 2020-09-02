const { KSoftClient } = require('@ksoft/api');
const { ksoftToken } = require('../token.json');
const ksoft = new KSoftClient(ksoftToken);
module.exports = {
    name: 'meme',
    description: 'Devuelve un meme .',
    cooldown: 5,
<<<<<<< HEAD
=======
    category: 'Images',
>>>>>>> d854065652136e0a6f5f1c1f6cbb2d540ef3367f
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
<<<<<<< HEAD
                text: `${meme.post.subreddit} | 👍 ${meme.post.upvotes} | 👎 ${meme.post.downvotes} | 💬 ${meme.post.comments}`,
=======
                text: `${meme.post.subreddit} | 👍 ${meme.post.upvotes} | 👎 ${meme.post.downvotes} | 💬 ${meme.post.comments} \n Powered by KSoft.Si.`,
>>>>>>> d854065652136e0a6f5f1c1f6cbb2d540ef3367f
            },
        };
        message.channel.send({ embed: memeEmbed });
    },
};
