const { Interaction } = require('discord.js')
const Command = require('../../structures/Command')
const { ApplicationCommandType, ApplicationCommandOptionType, ChannelType } = require('discord.js');
module.exports = class extends Command{
    constructor(client){
        super(client,{
            name: 'falar',
            description: 'Faz com que o bot diga alguma coisa',
            options: [
                {
                    name: 'canal',
                    type: ApplicationCommandOptionType.Channel,
                    description: 'Canal onde a mensagem será enviada.',
                    required: true
                },
                {
                    name: 'mensagem',
                    type: ApplicationCommandOptionType.String,
                    description: 'A mensagem que será enviada no canal',
                    required: true
                }
            ]
        })
    }

    run = (Interaction) => {
        const canal = Interaction.options.getChannel('canal')
        if(!canal.type == ChannelType.GuildText) return Interaction.reply({content: 'ERRO > Informe um canal de texto ou de anúncios', ephemeral: true})

        const texto = Interaction.options.getString('mensagem').replace(/\\n/g, "\n");

        canal.send({ content: texto })
        .then(() => Interaction.reply({content: `Mensagem enviada com sucesso no canal \`${canal.name}\`.`, ephemeral: true}))
        .catch(() => Interaction.reply({content: `ERRO > Erro ao enviar a mensagem no canal.`, ephemeral: true}))
    }
}

