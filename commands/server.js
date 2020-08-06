module.exports = {
    name: 'server',
    execute(message) {
        message.channel.send(`En ${message.guild.name} hay ${message.guild.memberCount} miembros.`); // Guild significa servidor, muestra el nombre del servidor y la cantidad de miembros actuales.
    },
};