module.exports = {
    name: 'stop',
    aliases: ['s'],
	description: 'Deja de reproducir música',
	async execute(message, args) {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play('audio.mp3');
            dispatcher.destroy();
        }
	},
};