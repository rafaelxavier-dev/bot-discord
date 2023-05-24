const { Interaction, ApplicationCommandOptionType } = require('discord.js')
const Command = require('../../structures/Command')

module.exports = class extends Command{
    constructor(client){
        super(client,{
            name: 'config',
            description: 'Configurar dados do servidor no BOT.',
            requireDatabase: true,
            options: [
                {
                    type: ApplicationCommandOptionType.SubcommandGroup,
                    name: 'welcome',
                    description: 'Configuração do sistema de boas-vindas.',
                    options: [
                        {
                            type: ApplicationCommandOptionType.Subcommand,
                            name: 'canal_entrada',
                            description: 'Configurar o canal onde a mensagem de boas-vindas será enviada.',
                            options: [
                                {
                                    type: ApplicationCommandOptionType.Channel,
                                    name: 'canal',
                                    description: 'Canal de texto onde a mensagem será enviada.',
                                    required: true
                                }
                            ] 
                        }
                    ]
                },
                {
                    type: ApplicationCommandOptionType.SubcommandGroup,
                    name: 'ticket',
                    description: 'Configuração do sistema de Tickets.',
                    options: [
                        {
                            type: ApplicationCommandOptionType.Subcommand,
                            name: 'mensagem',
                            description: 'Mensagem onde o usuário irá interagir para abrir o Ticket.',
                            options: [
                                {
                                    type: ApplicationCommandOptionType.Channel,
                                    name: 'canal',
                                    description: 'Canal de texto onde a mensagem será enviada.',
                                    required: true
                                }
                            ] 
                        }
                    ]
                },
                {
                    type: ApplicationCommandOptionType.SubcommandGroup,
                    name: 'form',
                    description: 'Configuração do sistema de formulários.',
                    requireDatabase: true,
                    options: [
                        {
                            type: ApplicationCommandOptionType.Subcommand,
                            name: 'canal_form',
                            description: 'Configurar o canal onde a mensagem de Respostas será enviada.',
                            options: [
                                {
                                    type: ApplicationCommandOptionType.Channel,
                                    name: 'canal2',
                                    description: 'Canal de texto onde a mensagem será enviada.',
                                    required: true
                                }
                            ] 
                        }
                    ]
                },
                {
                    type: ApplicationCommandOptionType.SubcommandGroup,
                    name: 'adv',
                    description: 'Configuração do sistema de advertência.',
                    requireDatabase: true,
                    options: [
                        {
                            type: ApplicationCommandOptionType.Subcommand,
                            name: 'canal_adv',
                            description: 'Configurar o canal onde a mensagem de Advertência será enviada.',
                            options: [
                                {
                                    type: ApplicationCommandOptionType.Channel,
                                    name: 'canal3',
                                    description: 'Canal de texto onde a mensagem será enviada.',
                                    required: true
                                }
                            ] 
                        }
                    ]
                }
            ]
        })
    }

    run = (interaction) => {
        if(!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply({ content: 'ERRO > Você não tem permissão para utilizar esse comando!', ephemeral: true})
        const subCommandGroup = interaction.options.getSubcommandGroup()
        const subCommand = interaction.options.getSubcommand()
    
        require(`../../subCommands/config/${subCommandGroup}/${subCommand}`)(this.client, interaction)
    }
}

