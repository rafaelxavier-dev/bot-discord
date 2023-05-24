const {ButtonBuilder, EmbedBuilder, ButtonStyle} = require('discord.js')
/*
    {
        button: MessageButton,
        embed: EmbedBuilder,
        name: String,
        id: String 

    }
*/

module.exports = [
    {
        button: new ButtonBuilder().setCustomId(`openTicket-1035571457419382834`).setLabel(`Bots Prontos`).setEmoji('🤖').setStyle(ButtonStyle.Secondary),
        embed: new EmbedBuilder().setDescription('Agradecemos sua preferência! Para adiantar nosso atendimento, digite /formbot e preencha o formulário. Em instantes te atendemos.'),
        name: 'Bots Prontos',
        id: '1035571457419382834',
        staffRole: '1035570989507039322'
    },
    {
        button: new ButtonBuilder().setCustomId(`openTicket-1035571497877655705`).setLabel(`Bots Personalizados`).setEmoji('🤖').setStyle(ButtonStyle.Secondary),
        embed: new EmbedBuilder().setDescription('Agradecemos sua preferência! Para adiantar nosso atendimento, digite /formcustom e preencha o formulário. Em instantes te atendemos.'),
        name: 'Bots Personalizados',
        id: '1035571497877655705',
        staffRole: '1035570989507039322'
    },
    {
        button: new ButtonBuilder().setCustomId(`openTicket-1035573987280965724`).setLabel(`Manutenção em Bot`).setEmoji('⚙️').setStyle(ButtonStyle.Secondary),
        embed: new EmbedBuilder().setDescription('Agradecemos sua preferência! Para adiantar nosso atendimento, digite /formgear e preencha o formulário. Em instantes te atendemos.'),
        name: 'Manutenção em Bot',
        id: '1035573987280965724',
        staffRole: '1035570989507039322'
    }
]