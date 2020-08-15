const Discord = require('discord.js'); // Libreria de Discord para JS
function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "" + hours : hours;
    minutes = (minutes < 10) ? "" + minutes : minutes;
    seconds = (seconds < 10) ? "" + seconds : seconds;
    let display = "";
    if (hours !== "0") {
        display += hours + " hora(s) ";
    }
    if (minutes !== "0") {
        display += minutes + " minuto(s) ";
    }
    if (seconds !== "0") {
        display += seconds + " segundo(s)";
    }
    return (display);
}
const timerStamp = new Discord.Collection();
let timeoutStamp;
let timerFinal;
module.exports = {
    name: 'timer',
    description: 'Permite poner un timer para X cantidad de minutos',
    args: true,
    usage: '<hours>h <minutes>m <seconds>s',
    execute(message, args) {
        let timer = 0;
        if (args[0] == "cancel") {
            message.reply("Se ha cancelado tu timer");
            clearTimeout(timerStamp.get(message.author.id));
            timerStamp.delete(message.author.id);
        }
        else {
            if (args.indexOf("r") == -1) {
                for (const argumento of args) {
                    if (argumento == "h") {
                        const posh = args.indexOf("h");
                        const numHoras = args[posh - 1];
                        timer += numHoras * 3600000;
                        args.splice(posh, 1);
                    }
                    else if (argumento == "m") {
                        const posm = args.indexOf("m");
                        const numMinutos = args[args.indexOf("m") - 1];
                        timer += numMinutos * 60000;
                        args.splice(posm, 1);
                    }
                    else if (argumento == "s") {
                        const poss = args.indexOf("s");
                        const numSegundos = args[args.indexOf("s") - 1];
                        timer += numSegundos * 1000;
                        args.splice(poss, 1);
                    }
                }
                args.unshift("r");
            }
            if (timerStamp.has(message.author.id)) {
                const timerRestante = timerStamp.get(message.author.id + 1) - Date.now();
                message.reply(`Aun faltan ${msToTime(timerRestante)}`);
            }
            else {
                timeoutStamp = setTimeout(function() {
                    message.reply(`Se termino el tiempo`);
                    timerStamp.delete(message.author.id);
                }, timer);
                timerFinal = Date.now() + timer;
                timerStamp.set(message.author.id, timeoutStamp);
                timerStamp.set(message.author.id + 1, timerFinal);
                message.reply(`Se ha puesto un timer de ${msToTime(timer)}`);
            }
        }
    },
};