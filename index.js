const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();


client.once('ready', () => {
	console.log('Ready!');
});
client.on('message', message => {
	if (message.content === `${prefix}mendoza`) {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('es La gorda');
    }
        else if (message.content === `${prefix}server`) {
            message.channel.send(`En ${message.guild.name} hay ${message.guild.memberCount} miembros.`);
        }
    if (message.content === `${prefix}groovy`) {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('se la re come');
    }
});
client.login(token);