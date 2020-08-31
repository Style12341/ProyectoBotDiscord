const api = 'https://api.ksoft.si/images/random-image';
const { KSoftClient } = require('@ksoft/api');
const { ksoftToken } = require ('../token.json');
const ksoft = new KSoftClient(ksoftToken);
const fetch = require('node-fetch'); // Requiere la libreria node fetch para trabajar con la API
module.exports = {
	name: 'random',
	description: 'Devuelve una imagen aleatoria.',
	async execute(message, args) {
        if(!args.length) {
            const tagList = await ksoft.images.tags();
            console.log(tagList);
        }
	},
};