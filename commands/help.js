const { prefix } = require('../config.json');
module.exports = {
    name: 'help',
    description: 'Lista de todos los comandos o informacion acerca de uno en especifico.',
    aliases: ['commands'],
    usage: '[Nombre del comando]',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const dataImages = [];
        const { commands } = message.client; // Obtiene la lista de comandos
        const helpEmbed = { // Crea un embed inicial para mostrar la ayuda.
            color: 0xff9900,
            author: {
                name: 'PanBot Help',
                icon_url: 'https://i.imgur.com/NAMH0Db.jpg',
            },
            title: "Lista de Comandos:",
            fields: [
                {
                    name: 'Comandos de uso general:',
                    value: 'Some value here',
                },
                {
                    name: 'Comandos de Imagenes:',
                    value: 'Some value here',
                },
            ],
            footer: {
                text: `Podes mandar \`${prefix}help [nombre del comando]\` para obtener información de ese comando en específico. Cantidad de comandos: ${commands.size}`,
            },
        };
        if (!args.length) { // Si no se proporcionan argumentos entra al ciclo if que mandará el embed
            for (const command of commands) {
                if (`${command.category}` == 'Images') {
                    dataImages.push(command.name);
                    console.log(command);
                }
            }
            console.log(commands.urban.category);
            console.log(dataImages);
            data.push(commands.map(command => command.name).join('` `')); // Le asocia al array data los comandos separados por acentos graves para darle formate a las palabras
            helpEmbed.fields[0].value = `\`${data}\``; // Se reemplaza el value del primer campo de texto con lo previamente guardado en el array data , con los acentos graves de inicio y final
            return message.reply({ embed: helpEmbed }); // Envia el embed.
        }
        const name = args[0].toLowerCase(); // convierte los argumentos a minusculas
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name)); // Verifica si existe el comando con su nombre/alias para el cual se pidió ayuda.

        if (!command) { // Si el comando no existe le hace saber al usuario.
            message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            message.react('❌');
            return message.reply('No es un comando válido.');
        }
        // Utilizando el array data se van introduciendo las respectivas propiedades del comando solicitado
        data.push(`**Nombre:** ${command.name}`);

        if (command.aliases) data.push(`**Alias:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Descripción:** ${command.description}`);
        if (command.usage) data.push(`**Uso:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} segundo(s)`);

        message.channel.send(data, { split: true });

        // ...
    },
};