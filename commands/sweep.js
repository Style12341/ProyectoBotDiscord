module.exports = {
    name: 'sweep',
    description: 'Borra hasta 99 mensajes',
    usage: `Numero de mensajes entre 1 y 99`,
    cooldown: 1,
	execute(message, args) {
        if (message.channel.type == 'text') {
		const amount = parseInt(args[0]) + 1; // Convierte la string de numero ingresada a un entero
        if (isNaN(amount)) {                  // Verifica si es nu numero NaN= Not a Number
            return message.reply(`No es un número válido`);
        }
        else if (amount <= 1 || amount > 99) {
            return message.reply ("Escriba un numero entre 1 y 100");
        }
        message.channel.bulkDelete(amount, true).catch(err =>{ // Salta un error si se eliminan mensajes mas viejos que dos semanas , agarra el error y avisa en el chat
        console.error(err);
        message.channel.send("Hubo un error limpiando los mensajes en este canal");
        });
    }
    },
};
