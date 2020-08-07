const Discord = require('discord.js'); // Libreria de Discord para JS
const msToTime = duration => {
    let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    if (hours == "00" && minutes == "00") {
        return (`${seconds}s`);
    }
    return (`${hours}h ${minutes}m ${seconds}s`);
  };
module.exports = {
	name: 'timer',
    description: 'Permite poner un timer para X cantidad de minutos',
    args: true,
    usage: '<hours>h <minutes>m <seconds>s',
	execute(message, args) {
        const now = Date.now();
        const timestamps = new Discord.Collection();
        timestamps.set(message.author.id, now);
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
                }
            args.unshift("r");
        }
        const timerFinal = timestamps.get(message.author.id) + timer;
        if (now < timerFinal) {
            const timerRestante = (timerFinal - now) / 1000 ;

            return message.reply(`Al timer aun le quedan ${msToTime(timerRestante)}`);
        }
		message.channel.send('Pong.');
	},
};