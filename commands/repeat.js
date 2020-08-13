module.exports = {
	name: 'repeat',
	description: '',
	execute(message, args) {
        message.channel.bulkDelete(1, true); //borra el mensaje escrito
        message.channel.send(`${message.author} dice: \n ${args.join(' ')}`); //devuelve el mensaje escrito pasando el array args a un string y llamandote
	},
};