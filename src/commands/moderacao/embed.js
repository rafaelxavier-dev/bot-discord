const { Interaction } = require('discord.js')
const Command = require('../../structures/Command')
const { EmbedBuilder } = require('discord.js')
const { ApplicationCommandType, ChannelType, ApplicationCommandOptionType } = require('discord.js');
module.exports = class extends Command{
    constructor(client){
        super(client,{
            name: 'embed',
            description: 'Faz com que o bot diga alguma coisa embed',
            options: [
                {
                    name: 'canal',
                    type: ApplicationCommandOptionType.Channel,
                    description: 'Canal onde a mensagem será enviada.',
                    required: true
                },
                {
                    name: 'titulo',
                    type: ApplicationCommandOptionType.String,
                    description: 'Título da embed.',
                    required: true
                },
                {
                    name: 'mensagem',
                    type: ApplicationCommandOptionType.String,
                    description: 'Mensagem da embed.',
                    required: true
                },
                {
                    name: 'cor',
                    type: ApplicationCommandOptionType.String,
                    description: 'Cor da embed.',
                    choices: [
                        {
                            name: 'Vermelho',
                            value: '#FFFFFF'
                        },
                        {
                            name: 'Azul',
                            value: '#0000ff'
                        },
                        {
                            name: 'Preto',
                            value: '#000000'
                        },
                        {
                            name: 'Verde',
                            value: '#008000'
                        },
                        {
                            name: 'Roxo',
                            value: '#993399'
                        }
                    ],
                    required: true
                }
            ]
        })
    }

    run = (Interaction) => {
        const canal = Interaction.options.getChannel('canal')
        if(!canal.type == ChannelType.GuildText) return Interaction.reply({content: 'ERRO > Informe um canal de texto ou de anúncios', ephemeral: true})

        const texto = Interaction.options.getString('mensagem').replace(/\\n/g, "\n");
        const titulo = Interaction.options.getString('titulo')
        const cor = Interaction.options.getString('cor')

        const embed = new EmbedBuilder()
            .setTitle(titulo)
            .setDescription(texto)
            .setColor(cor)
            .setTimestamp()

        canal.send({ embeds: [embed] })
        .then(() => Interaction.reply({content: `Mensagem enviada com sucesso no canal \`${canal.name}\`.`, ephemeral: true}))
        .catch(() => Interaction.reply({content: `ERRO > Erro ao enviar a mensagem no canal.`, ephemeral: true}))

        function emoji(id) { return client.emojis.cache.get(id).toString() };
    }

    
}

