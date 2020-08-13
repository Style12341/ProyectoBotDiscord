module.exports = {
	name: 'say',
	description: '',
	execute(message, args) {
        message.channel.bulkDelete(1, true); //borra el mensaje escrito
        message.channel.send(args.join(' ')); //devuelve el mensaje escrito pasando el array args a un string
	},
};