const fs = require('fs');              // Libreria File System de JS
const Discord = require('discord.js'); // Libreria de Discord para JS

const { prefix, token } = require('./config.json'); // Variables Predefinidas
const client = new Discord.Client();                // Crea un nuevo cliente de discord

client.commands = new Discord.Collection();                                             // Crea una nueva "coleccion" es un Map con funciones extras de la libreria de discord
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // Pone el nombre de todos los archivos terminados en .js dentro de la carpeta /commands en un array

for (const file of commandFiles) {                  // Por cada archivo en el array commandfiles se repite el ciclo.
    const command = require(`./commands/${file}`);  // Le asigna a command el comando actual del ciclo.

    client.commands.set(command.name, command);     // Le asigna un nuevo nombre y valor en la collection con el command definido previamente.
}

client.once('ready', () => {
    console.log('Ready!');
});
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;                                                    // Si el mensaje no comienza con el prefijo , o lo escribio otro bot, lo ignora.
    if (message.content === prefix) return message.channel.send(`Hace falta un comando. ${message.author} Pedazo de Trolo!`); // Si se escribe el prefijo sin comando te avisa.

    const args = message.content.slice(prefix.length).trim().split(/ +/); // Crea una variable args, elimina el prefijo, elimina los espacios al inicio y al final ordena las strings en strings individuales en un array
    const commandName = args.shift().toLowerCase();                       // Crea una variable command, agarra el primer elemento de un array, lo devuelve y lo elimina para no tener el comando guardado en el array.

    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

    if (command.args  && !args.length) {
        return message.channel.send(`No escribiste argumentos, ${message.author}!`);
     }
    try {
	command.execute(message, args, commandName);
    }
    catch (error) {
	console.error(error);
	message.reply('Hubo un error al ejecutar ese comando');
    }
    }),
client.login(token);