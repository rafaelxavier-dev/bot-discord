const { EmbedBuilder, MessageActionRow } = require("discord.js")
const ticketCategories = require('../../../util/ticketCategories')

module.exports = (client, interaction) => {
    const channel = interaction.options.getChannel('canal')

    if (channel.type !== 'GUILD_TEXT') return interaction.reply({ content: 'ERRO > Informe um canal de texto.', ephemeral: true})

    const embed = new EmbedBuilder()
        .setDescription('Para iniciar o atendimento selecione o botão desejado. Após a abertura do ticket, nossa equipe tem até 24h para te responder. \n\n**Hora(s) & Dia(s)**')
        .addFields(
            //{ name: 'Atendimento'},
            { name: 'Segunda á Sexta', value: '07:30 até 22:00' }
            )
        .setAuthor('Atendimento ao Cliente')
        .setThumbnail('https://cdn.discordapp.com/attachments/1035580747404284035/1035580793541627964/GIF_-_Xavier_-_by_Design_Ideal.gif')
        .setFooter({ text: 'Xavier Shop ©️ Todos os direitos reservados.', iconURL: 'https://cdn.discordapp.com/attachments/1035580747404284035/1035580793541627964/GIF_-_Xavier_-_by_Design_Ideal.gif' });
    const buttons = ticketCategories.map(c => c.button)
    const row = new MessageActionRow().addComponents(buttons)

    channel.send({ embeds: [embed], components: [row] })

    interaction.reply({ content: 'Canal setado com sucesso.', ephemeral: true})
}