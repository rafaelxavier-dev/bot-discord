const { Interaction } = require('discord.js')
const Command = require('../../structures/Command')
const { EmbedBuilder } = require('discord.js')
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
module.exports = class extends Command{
    constructor(client){
        super(client,{
            name: 'converter',
            description: 'Converte um membro de Leed para cliente.',
            options: [
                {
                    name: 'cliente',
                    type: ApplicationCommandOptionType.User,
                    description: 'Cliente da compra.',
                    required: true
                }
            ]
        })
    }

    run = async (Interaction) => {
        const guildDB = await this.client.db.guilds.findById(Interaction.guild.id)

        //const pix = Interaction.guild.channels.cache.get(guildDB.pix.chave)
        const cliente = Interaction.options.getUser('cliente')
     
        const embed = new EmbedBuilder()
            .setTitle('🥳 Parabéns por sua compra!')
            .setDescription('Obrigado pela preferência. Os próximos passos é aguardar nossa equipe configurar seu produto ou solicitar novas informações!')
            .setColor('GREEN')
            .setImage('https://cdn.discordapp.com/attachments/1035580747404284035/1036747890254684210/Compra.png')
            .setTimestamp()

            
            Interaction.reply({content: 'Membro convertido!', ephemeral: true})
            Interaction.channel.send({ embeds: [embed] })
        
    }
}

