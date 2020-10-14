// const Discord = require('discord.js');
const math = require('mathjs');
// const parser = math.parser();

module.exports = {
	name: 'calc',
    description: 'calcula lo que se escribe y devuelve un embed.',
    // args: true,
    // usage: '<expresion matematica>',
	execute(message, args) {
        /* if (!args.lenght) {
            const embed = new Discord.MessageEmbed()
            .setColor(0xff9900)
            .setTitle('escribilo bien bitch');
        message.channel.send(embed);
        }
        else {*/
        if (!args.length) {
            const helpEmbed = {
                color: 0xff9900,
                title: 'Funciones del comando `calc`:',

                fields: [
                    {
                        name: 'Operación Matemática.',
                        value: 'Ejemplos: `n` + `m`; `n` * `m`; `n` / `m`; etc...',
                    },
                    {
                        name: 'Función Matemática.',
                        value: 'Ejemplos: cos(`x`); tanh(`x`); ln(`x`); etc...',
                    },
                    {
                        name: 'Cambio de Unidadades.\nUso: `n` `u1` to `u2`, transforma las unidades del valor `n` en la unidad `u1` a la unidad `u2`',
                        value: 'Ejemplo: 1000g to kg = 1kg',
                    },
                ],
            };

            message.channel.send({ embed: helpEmbed });
        }
        else{

            let resp;
        try {
            // resp = parser.evaluate(args.join(' '));
            resp = math.evaluate(args.join(' '));
        }
        catch (error) {
            return message.channel.send('Ocurrió un error intentando calcular.');
        }

        const respEmbed = {
            color: 0xff9900,
            title: 'Cálculo Matemático',

            fields: [
                {
                    name: 'Input',
                    value: `\`\`\`js\n${args.join(' ')}\`\`\``,
                },
                {
                    name: 'Output',
                     value: `\`\`\`js\n${resp}\`\`\``,
                },
            ],
        };

        message.channel.send({ embed: respEmbed });
        }

            /*
            const embed = new Discord.MessageEmbed()
                .setColor(0xff9900)
                .setTitle('Cálculo Matematico:')
                .addField('Input:', `\`\`\`js\n${args.join(' ')}\`\`\``)
                .addField('Output:', `\`\`\`js\n${resp}\`\`\``);

            message.channel.send(embed);
            */
 //       }
	},
};
