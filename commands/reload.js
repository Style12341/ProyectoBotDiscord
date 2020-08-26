module.exports = {
	name: 'reload',
	description: 'Recarga un Comando',
	args: true,
	execute(message, args) {
		const commandName = args[0].toLowerCase(); // Obtiene el nombre del comando
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); // Selecciona el nombre del comando o de alguno de sus alias

		if (!command) {
			return message.channel.send(`No existe ningun comando con ese nombre o alias \`${commandName}\`, ${message.author}!`); // Avisa que no existe el comando que se desea recargar
		}
		delete require.cache[require.resolve(`./${command.name}.js`)]; // Elimina el cache del comando previamente cargado
		try {
			const newCommand = require(`./${command.name}.js`);        // Se le asigna a newCommand el archivo del comando recargado
			message.client.commands.set(newCommand.name, newCommand);  // Setea el comando nuevo
			message.reply(`Se ha restablecido el comando ${command.name}`);
		}
		catch (error) {
			console.log(error);
			message.channel.send(`Ha ocurrido un error recargando el comando \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};