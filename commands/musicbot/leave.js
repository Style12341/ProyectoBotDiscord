module.exports = {
    name: 'leave',
    aliases: ['l'],
	description: 'leaves',
	async execute(message, args) {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            connection.disconnect();
        }
	},
};