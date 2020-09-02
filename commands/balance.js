const currency = require('../index.js');
module.exports = {
    name: 'balance',
    description: 'Muestra la cantidad de dinero almacenada',
    cooldown: 5,
    category: 'economy',
    async execute(message) {
        const target = message.mentions.users.first() || message.author;
        return message.channel.send(`${target.tag} has ${currency.getBalance(target.id)}💰`);
    },
};