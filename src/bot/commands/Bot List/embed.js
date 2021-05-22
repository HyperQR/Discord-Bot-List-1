const { Command } = require('klasa');
const fetch = require('node-fetch');
const Bots = require("@models/bots");

const { web: {domain_with_protocol} } = require("@root/config.json");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: '[User:user]',
            description: "See the Widget of a Bot"
        });
    }

    async run(message, [user]) {
        console.log(user)
        if (!user || !user.bot) return message.channel.send(`@Mention a bot to get embed`);
        let url = `${domain_with_protocol}/api/embed/${user.id}`;
        let img = await fetch(url).then(res => res.buffer());
        message.channel.send({ files: [img] });
    }

};