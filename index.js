const fs = require('fs');              // Libreria File System de JS
const Discord = require('discord.js'); // Libreria de Discord para JS

const { prefix } = require('./config.json'); // Variables Predefinidas

const client = new Discord.Client();                // Crea un nuevo cliente de discord
client.commands = new Discord.Collection();         // Crea una nueva "coleccion" es un Map con funciones extras de la libreria de discord
const cooldowns = new Discord.Collection();         // Crea una coleccion para los cooldowns
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // Pone el nombre de todos los archivos terminados en .js dentro de la carpeta /commands en un array

for (const file of commandFiles) {                  // Por cada archivo en el array commandfiles se repite el ciclo.
    const command = require(`./commands/${file}`);  // Le asigna a command el comando actual del ciclo.

    client.commands.set(command.name, command);     // Le asigna un nuevo nombre y valor en la collection con el command definido previamente.
}

client.once('ready', () => {
    console.log('Listo!');
});
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;                                                    // Si el mensaje no comienza con el prefijo , o lo escribio otro bot, lo ignora.
    if (message.content === prefix) return message.channel.send(`Hace falta un comando. ${message.author} Pedazo de Trolo!`); // Si se escribe el prefijo sin comando te avisa.

    const args = message.content.slice(prefix.length).trim().split(/ +/); // Crea una variable args, elimina el prefijo, elimina los espacios al inicio y al final ordena las strings en strings individuales en un array
    const commandName = args.shift().toLowerCase();                       // Crea una variable command, agarra el primer elemento de un array, lo devuelve y lo elimina para no tener el comando guardado en el array.
    const command = client.commands.get(commandName)                                      // Acorta la funcion de obtener el comando
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); // Verififica dentro de los comandos cuales son sus alias para chequear si se introducen
	if (!command) return;                                                                 // Si el comando o alias no esta en la lista , vuelve.
    // Condicional que avisa si faltan argumentos para el comando o si fue utilizado incorrectamente
    if (command.args  && !args.length) {
        let reply = `No escribiste argumentos, ${message.author}!`;
        if (command.usage) {
        reply += `\nEl comando se utiliza de la siguiente manera \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }
    // Condicional que le agrega un definicion de cooldown al comando si no lo tiene ya establecida
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();                                // Obtiene la marca de tiempo actual
    const timestamps = cooldowns.get(command.name);        // Obtiene la marca de tiempo de cooldown del comando utilizado
    const cooldownAmount = (command.cooldown || 3) * 1000; // Pone un cooldown default de 3 segundos y sino utiliza el preestablecido y lo convierte a segundos
    // Condicional que verifica si el usuario ya puede reenviar el comando
    if (timestamps.has(message.author.id)) {                                       // Verifica si la coleccion timestamps tiene la ID del autor del mensaje
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount; // Se obtiene la marca de tiempo del mensaje del autor y se le suma el cooldown
        if (now < expirationTime) {                                                // Verifica si ya expiro el tiempo verificandolo con el actual
            const timeLeft = (expirationTime - now) / 1000;                        // Define la variable de tiempo restante
            return message.reply(`Por favor espere ${timeLeft.toFixed(1)} segundos mas antes de utilizar el comando \`${command.name}\``); // Avisa cuantos segundos, redondeado al entero faltan para volver a utilizar el comando
        }
    }
    timestamps.set(message.author.id, now);                                 // Setea la marca de tiempo del autor del mensaje a la actual
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); // Elimina la marca de tiempo asociado con el autor del mensaje
    // Ciclo try catch que ejecuta el comando ingresado y en caso de error le avisa al usuario
    try {
    message.react('👍');// Reacciona al mensaje del usuario
    command.execute(message, args, commandName); // Utilizando la variable command y commandName obtiene el nombre del comando y lo ejecuta
    }
    catch (error) {
    console.error(error);
    message.reactions.removeAll();
    message.react('❌');
	message.reply('Hubo un error al ejecutar ese comando');
    }
    }),
client.login(process.env.BOT_TOKEN);