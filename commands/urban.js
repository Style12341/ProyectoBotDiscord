module.exports = {
    name: 'urban',
    description: 'Busca en la base de datos de Urban Dictionary',
    usage: 'palabra a buscar en Urban Dictionary',
    args: true,
    async execute(message, args) {
        const fetch = require('node-fetch'); // Requiere la libreria node fetch para trabajar con la API
        const querystring = require('querystring'); // Requiere la libreria querystring para convertir argumentos en una string compatible para busqueda por URL
        const query = querystring.stringify({ term: args.join(' ') }); // Convierte los argumentos introducidos en una string compatible
        const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str); // Funcion trim, que acepta una string y un maximo de caracteres, si esta sobrepasa este numero, corta la string hasta ese limite
        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json()); // Crea una constante list que le pide a la API de urban su respectivo archivo JSON y lo guarda
        if (!list.length) { // Ciclo If que si la lista proporcionada por el archivo JSON no contiene ninguna respuesta le avisa al usuario
            return message.channel.send(`No se encontraron resultados para **${args.join(' ')}**.`);
        }
        const [answer] = list; // Asocia el primer objeto del array List a answer.
        const embedUrban = { // Embed que muestra la definicion , un ejemplo, y las votaciones de esa definicion.
            color: 0xEFFF00,
            title: answer.word,
            url: answer.permalink,
            thumbnail: {
                url: `https://everythingfat.files.wordpress.com/2013/01/ud-logo.jpg`,
            },
            fields: [
                {
                    name: 'Definición',
                    value: trim(answer.definition, 1024),
                },
                {
                    name: `Ejemplo`,
                    value: trim(answer.example, 1024),
                },
                {
                    name: `Rating`,
                    value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.`,
                },
            ],
        };
        return message.channel.send({ embed : embedUrban });
    },
};
