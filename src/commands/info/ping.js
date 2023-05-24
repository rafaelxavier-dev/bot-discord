const { Interaction } = require('discord.js')
const Command = require('../../structures/Command')

module.exports = class extends Command{
    constructor(client){
        super(client,{
            name: 'ping',
            description: 'Mostra o ping do BOT.'
        })
    }

    run = (Interaction) => {
        Interaction.reply({
            content: `Ping do bot é \`${this.client.ws.ping}\`ms.`,
            ephemeral: true
        })
    }
}

