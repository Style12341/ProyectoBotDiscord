module.exports = {
	name: 'ltx',
	description: 'transforma ecuacion a latex',
	execute(message, args) {
            if (!args.length) {
            const helpEmbed = {
                color: 0xff9900,
                title: 'Funciones del comando `ltx`:',

                fields: [
                    {
                        name: 'Escribir una formula en formato "LaTeX" para devolver una previsualizacion de la misma.',
                        value: 'Ejemplos: `\\int_{-\\infty}^{0}e^x\\,dx=1`',
                    },
                ],
                image: {
                        url: `https://latex.codecogs.com/png.latex?\\dpi{${'150'}}&space;\\${'huge'}&space;{\\color{${'White'}}${'\\int_{-\\infty}^{0}e^x\\,dx=1'}}`,
                },
            };

            message.channel.send({ embed: helpEmbed });
        }
        // message.channel.send(`https://latex.codecogs.com/png.latex?%5Cdpi%7B${'150'}%7D%${'20'}%5Cbg_${'2c2f33'}%20%5C${'huge'}%20%7B%5Ccolor%7B${'white'}%7D${args.join(' ')}`);
        // message.channel.send(`https://latex.codecogs.com/png.latex?%5Cdpi%7B${'150'}%7D%${'20'}%5C%20%5C${'huge'}%20%7B%5Ccolor%7B${'white'}%7D${args.join(' ')}`);
        // message.channel.send(`https://latex.codecogs.com/png.latex?\\dpi{${'150'}}&space;\\bg_${'2c2f33'}&space;\\${'huge'}&space;{\\color{${'White'}}${args.join(' ')}}`);
        // message.channel.send(`https://latex.codecogs.com/png.latex?\\dpi{${'150'}}&space;\\fn_cs&space;\\${'huge'}&space;{\\color{${'White'}}${args.join('')}}`); comics sans
        message.channel.send(`https://latex.codecogs.com/png.latex?\\dpi{${'150'}}&space;\\${'huge'}&space;{\\color{${'White'}}${args.join('')}}`);
        // message.channel.send(`${args.join(' ')}`);
	},
};