const api = 'https://jsonplaceholder.typicode.com/posts';
const snekfetch = require('snekfetch');
module.exports = {
	name: 'random',
	description: 'Devuelve una imagen aleatoria.',
	async execute(message, args) {
        const fetch = require('node-fetch'); // Requiere la libreria node fetch para trabajar con la API
        console.log('test');
        fetch(api, {method: 'GET'}
	},
};