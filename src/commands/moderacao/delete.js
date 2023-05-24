const { Interaction } = require('discord.js')
const Command = require('../../structures/Command')
const { ApplicationCommandType, ApplicationCommandOptionType,ChannelType } = require('discord.js');
module.exports = class extends Command{
    constructor(client){
        super(client,{
            name: 'deletar',
            description: 'Faz com que o apague mensagens em quantidade.',
            options: [
                {
                    name: 'canal',
                    type: ApplicationCommandOptionType.Channel,
                    description: 'Canal onde as mensagens serão apagadas.',
                    required: true
                },
                {
                    name: 'quantidade',
                    type: ApplicationCommandOptionType.Integer,
                    description: 'Quantidade de mensagens que deseja apagar.',
                    required: true
                }
            ]
        })
    }

    run = (Interaction) => {
        const canal = Interaction.options.getChannel('canal')
        const quant = Interaction.options.getInteger('quantidade')
        if(!canal.type == ChannelType.GuildText) return Interaction.reply({content: 'ERRO > Informe um canal de texto', ephemeral: true})

        canal.bulkDelete(quant)
            .then(() => Interaction.reply({content: `\`${quant}\` mensagens foram apagadas com sucesso no canal, \`${canal.name}\`.`, ephemeral: true}))
            .catch(() => Interaction.reply({content: `ERRO > Erro ao apagar as mensagens.`, ephemeral: true}))

    }
}

