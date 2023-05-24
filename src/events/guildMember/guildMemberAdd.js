const Event = require('../../structures/Event')
const { EmbedBuilder } = require('discord.js')

module.exports = class extends Event{
    constructor(client){
        super(client, {
            name: 'guildMemberAdd'
        })
    }

    run = async (member) =>{

        member.roles.add('1035570870741114961')
        const guildDB = await this.client.db.guilds.findById(member.guild.id)

        if(guildDB?.welcome){
            const welcomeChannel = member.guild.channels.cache.get(guildDB.welcome.channel)

            welcomeChannel?.send(`${member.toString()}`)
            const embed = new EmbedBuilder()
            .setTitle('Bem Vindo')
            .setDescription(`Quer adquirir um de nossos Bots ou criar um personalizado seu? Fique a vontade para abrir um Ticket.`)
            .setColor('GREEN')
            .setTimestamp()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))

            welcomeChannel?.send({ embeds: [embed] })

            //welcomeChannel?.send(`${member.toString()}, seja bem vindo ano nosso servidor!`)
        }
    }
}