module.exports = {
    name: 'dog',
    description: 'Proporciona la foto de un perrito',
    async execute(message, args) {
        const fetch = require('node-fetch'); // Requiere la libreria node fetch para trabajar con la API
        const { message } = await fetch(`https://dog.ceo/api/breeds/image/random`).then(response => response.json()); // Crea una constante list que le pide a la API de perros su respectivo archivo JSON y lo guarda
        console.log(file);
        // return message.channel.send(file);
    },
};