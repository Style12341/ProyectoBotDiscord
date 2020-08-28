const Discord = require('discord.js'); // Libreria de Discord para JS
module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message) {
			message.channel.send("Pinging...").then(m => {
				// The math thingy to calculate the user's ping
				const ping = m.createdTimestamp - message.createdTimestamp;
				// Basic embed
				const embed = new Discord.MessageEmbed()
					.setAuthor(`Tu ping es ${ping}`)
					.setColor("0xff9900");

				// Then It Edits the message with the ping variable embed that you created
				m.edit(embed);
			});
		},
	};