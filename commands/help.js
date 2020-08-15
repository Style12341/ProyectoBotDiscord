const { prefix } = require('../config.json');
module.exports = {
    name: 'help',
    description: 'Lista de todos los comandos o informacion acerca de uno en especifico.',
    aliases: ['commands'],
    usage: '[Nombre del comando]',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Aqui hay una lista de todos los comandos:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nPodes mandar \`${prefix}help [nombre del comando]\` para obtener información de ese comando en específico.`);

            return message.reply(data, { split: true });
                /* .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply(`Te mande por privado una lista de mis comandos.`);
                })
                .catch(error => {
                    console.error(`No se pudo manar un DM a ${message.author.tag}.\n`, error);
                    message.reply('Parece ser que no te puedo mandar un mensaje. Probablemente lo tengas desactivado.');
                });*/
        }
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('No es un comando válido.');
        }

        data.push(`**Nombre:** ${command.name}`);

        if (command.aliases) data.push(`**Alias:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Descripción:** ${command.description}`);
        if (command.usage) data.push(`**Uso:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} segundo(s)`);

        message.channel.send(data, { split: true });

        // ...
    },
};