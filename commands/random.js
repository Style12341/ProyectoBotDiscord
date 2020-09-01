const { KSoftClient } = require('@ksoft/api');
const ksoftToken = process.env.KSOFT_TOKEN;
const ksoft = new KSoftClient(ksoftToken);
const { prefix } = require('../config.json');
module.exports = {
    name: 'random',
    description: 'Devuelve una imagen aleatoria.',
    usage: '<tag>',
    cooldown: 5,
    async execute(message, args) {
        const tagEmbed = { // Crea un embed inicial para mostrar la ayuda.
            color: 0xff9900,
            author: {
                name: 'Tags',
                icon_url: 'https://i.imgur.com/NAMH0Db.jpg',
            },
            fields: [
                {
                    name: 'Lista de tags:',
                    value: 'Some value here',
                },
            ],
            footer: {
                text: `Utilize ${prefix}random <tag>`,
            },
        };
        if (!args.length) {
            const tagList = [];
            const tagArray = await ksoft.images.tags();
            for (const tags of tagArray) {
                if (tags.nsfw == false) {
                    tagList.push(tags.name);
                }
            }
            const tags = tagList.join('` `');
            tagEmbed.fields[0].value = `\`${tags}\``;
            return message.reply({ embed: tagEmbed });
        }
        if (args[0] == "bird") {
            args[0] = "birb";
        }
        try {
            const image = await ksoft.images.random(args[0], { nsfw: false });
            message.channel.send(image.url);
        }
        catch (error) {
            console.error("Hubo un error");
            message.reactions.removeAll();
            message.react('❌');
            message.reply('Hubo un error al ejecutar ese comando');
        }
    },
};