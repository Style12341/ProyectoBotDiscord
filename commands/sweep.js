module.exports = {
    name: 'sweep',
    description: 'Borra hasta 99 mensajes',
    usage: `Numero de mensajes entre 1 y 99`,
    cooldown: 1,
	execute(message, args) {
        const xReact = () =>{
            message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            message.react('❌');
        };
        if (message.channel.type == 'text') {
		const amount = parseInt(args[0]) + 1; // Convierte la string de numero ingresada a un entero
        if (isNaN(amount)) {                  // Verifica si es nu numero NaN= Not a Number
            xReact();
            return message.reply(`No es un número válido, escriba un numero entre 1 y 100 `);
        }
        else if (amount <= 1 || amount > 100) {
            xReact();
            return message.reply ("Escriba un numero entre 1 y 100");
        }
        message.channel.bulkDelete(amount, true).catch(err =>{ // Salta un error si se eliminan mensajes mas viejos que dos semanas , agarra el error y avisa en el chat
        console.error(err);
        xReact();
        message.channel.send("Hubo un error limpiando los mensajes en este canal");
        });
    }
    },
};
