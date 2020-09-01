module.exports = {
    name: 'cat',
    description: 'Proporciona la foto de un gatito',
    category: 'Images',
    async execute(message) {
        const fetch = require('node-fetch'); // Requiere la libreria node fetch para trabajar con la API
        const { file } = await fetch(`https://aws.random.cat/meow`).then(response => response.json()); // Crea una constante file que almacena la url del JSON proporiconado
        return message.channel.send(file);
    },
};