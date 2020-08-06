module.exports = {
    name: 'listen',
    args: true,
    execute(message, args, commandName) {
        if (args[0] === 'soy') {
            return message.channel.send('un trolaso');
        }
        message.channel.send(`Nombre del comando: ${commandName}\nArgumentos: ${args}`); // Llama a la funcion command para eliminar el comando del array y te devulve los argumentos separados por comas.
    },
};