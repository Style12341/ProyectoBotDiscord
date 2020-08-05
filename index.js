const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
    /* function random(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min);
    }
    */
client.once('ready', () => {
    console.log('Ready!');
});
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.content === prefix) return message.channel.send(`Hace falta un comando. ${message.author} Pedazo de Trolo!`);

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const msgsend = message.content.toLocaleLowerCase() ;

    if (message.content === `${prefix}mendoza`) {
        message.channel.send('es La gorda');
    }
    else if (message.content === `${prefix}server`) {
        message.channel.send(`En ${message.guild.name} hay ${message.guild.memberCount} miembros.`);
    }
    else if (msgsend === `${prefix}groovy`) {
        message.channel.send('se la re come');
    }
    else if (command === "listen") {
        if (!args.length) {
            return message.channel.send(`No incluiste un argumento, ${message.author}!`);
        }
        else if (args[0] === 'soy') {
            return message.channel.send('un trolaso');
        }
        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    }
});
client.login(token);