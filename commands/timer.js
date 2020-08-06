const Discord = require('discord.js'); // Libreria de Discord para JS
module.exports = {
	name: 'timer',
    description: 'Permite poner un timer para X cantidad de minutos',
    args: true,
    usage: '<hours>h <minutes>m <seconds>s',
	execute(message, args) {
        const now = Date.now();
        const timestamps = new Discord.Collection();
        let timer = 0;
        if (args.indexOf("r") == -1) { 
            for (const argumento of args) {
                if (argumento == "h") {
                    const posh = args.indexOf("h");
                    const numHoras = args[posh - 1];
                    timer += numHoras * 3600000 ;
                    args.splice(posh, 1);
                }
                else if (argumento == "m") {
                    const posm = args.indexof("m");
                    const numMinutos = args[args.indexOf("m") - 1];
                    timer += numMinutos * 60000 ;
                    args.splice(posm, 1);
                }
                else if (argumento == "s") {
                    const poss = args.indexof("s");
                    const numSegundos = args[args.indexOf("s") - 1];
                    timer += numSegundos * 1000 ;
                    args.splice(poss, 1);
                }
                else{
                    args.unshift("r");
                }
            }
        }
		message.channel.send('Pong.');
	},
};