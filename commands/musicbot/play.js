const fs = require('fs');
const ytdl = require('ytdl-core-discord');
module.exports = {
    name: 'play',
    aliases: ['p'],
    description: 'plays a song',
    async execute(message, args) {
        async function play(connection, url) {
            connection.play(await ytdl(url), { type: 'opus' });
        }
        console.log(args);
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const dispatcher = play(connection, args[0]);

            dispatcher.on('start', () => {
                console.log('audio.mp3 is now playing!');
            });

            dispatcher.on('finish', () => {
                console.log('audio.mp3 has finished playing!');
            });

            // Always remember to handle errors appropriately!
            dispatcher.on('error', console.error);
        }
    },
};