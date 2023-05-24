module.exports = (client, interaction) => {
    const channel = interaction.options.getChannel('canal3')

    if (channel.type !== 'GUILD_TEXT') return interaction.reply({ content: 'ERRO > Informe um canal de texto.', ephemeral: true})

    if (interaction.guild.db.adv) interaction.guild.db.adv.channel = channel.id
    else interaction.guild.db.adv = { channel: channel.id }

    interaction.guild.db.save()

    interaction.reply({ content: 'Canal configurado com sucesso!', ephemeral: true })
}