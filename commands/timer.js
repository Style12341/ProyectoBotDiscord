const Discord = require('discord.js'); // Libreria de Discord para JS
function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    let display = "";
    if (hours !== "00") {
        display += hours + "h";
    }
    if (minutes !== "00") {
        display += minutes + "m";
    }
    if (seconds !== "00") {
        display += seconds + "s";
    }
    return (display);
  }
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
                console.log("inside for before if");
                console.log(args);
                console.log(argumento);
                if (argumento == "h") {
                    const posh = args.indexOf("h");
                    console.log("posh");
                    const numHoras = args[posh - 1];
                    timer += numHoras * 3600000 ;
                    args.splice(posh, 1);
                }
                else if (argumento == "m") {
                    const posm = args.indexOf("m");
                    const numMinutos = args[args.indexOf("m") - 1];
                    timer += numMinutos * 60000 ;
                    args.splice(posm, 1);
                }
                else if (argumento == "s") {
                    const poss = args.indexOf("s");
                    const numSegundos = args[args.indexOf("s") - 1];
                    timer += numSegundos * 1000 ;
                    args.splice(poss, 1);
                }
                }
            args.unshift("r");
        }
        console.log(timer);
        console.log(now);
        if (timestamps.has(message.author.id)) {
            var timerFinal = timestamps.get(message.author.id) + timer;
            const timerRestante = (timerFinal - now);
            console.log(timerRestante);
            return message.reply(`Al timer aun le quedan ${msToTime(timerRestante)}`);
        }
        timestamps.set(message.author.id, now);
         if (timerFinal == now || now > timerFinal) {
            return message.reply("Se termino el tiempo");
        }
		message.channel.send('test');
	},
};