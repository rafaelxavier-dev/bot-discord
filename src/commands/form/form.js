const Command = require('../../structures/Command')
const questions = require('../../util/formQuestions')
const { once } = require('events')
const { EmbedBuilder, MessageActionRow, MessageSelectMenu, Message } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'formantigo',
            description: 'Realiza um formulário para o cliente.'
        })
    }

    run = async (interaction, member, message) => {
        const guildDB = await this.client.db.guilds.findById(interaction.guild.id)

        const formChannel = interaction.guild.channels.cache.get(guildDB.form.channel)
        
        interaction.reply({ content: 'Formulário iniciado. Responda às perguntas abaixo:', ephemeral: true })
        
        createForm()
            .then(answers => {
                const embed = new EmbedBuilder()
                    .setTitle('Respostas do formulário:')
                    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setFooter(`ID do usuário: ${interaction.user.id}`)
                    .setColor('#0000ff')
                    .addFields(answers)

                    //interaction.channel.send({ embeds: [embed] } )
                    formChannel.send({ content: interaction.user.toString(),embeds: [embed] } )
                    interaction.channel.send({ content: interaction.user.toString()+' Sua mensagem foi registrada! Entraremos em contato.' } )
                    
                    
            })
            
            .catch((erro) => {
                const embed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setDescription(erro)

                interaction.channel.send({ content: interaction.user.toString(), embeds: [embed]  })
            })

        async function createForm() {
            const answers = []
            const channel = interaction.channel 

            for (const question of questions) {
                const embed = new EmbedBuilder()
                    .setTitle(question.question)
                    .setFooter('Você tem 15 minutos para responder a esta pergunta.')

                if (question.options) {
                    const actionRow = new MessageActionRow()
                        .addComponents(new MessageSelectMenu(question))

                    const msg = await channel.send({ content: interaction.user.toString(), embeds: [embed], components: [actionRow] })

                    const filter = (i) => i.user.id = interaction.user.id
                    const collector = msg.createMessageComponentCollector({ filter, max: 1, time: (15 * 60000)})

                    const [collected, reason] = await once(collector, 'end')            

                    if (reason === 'limit') {
                        msg.delete().catch(() => {})
                        answers.push({
                            name: collected.first().customId,
                            value: collected.first().values.join(', ')
                        })
                    }
                    else if (reason === 'time') throw ('O tempo para responder à pergunta se esgotou e o fomulário foi cancelado.')
                    else throw ('Ocorreu um erro durante a realização do formulário e este foi finalizado.')
                } else {
                    const msg = await channel.send({ content: interaction.user.toString(), embeds: [embed] })

                    const filter = (m) => m.author.id === interaction.user.id && m.content?.length
                    const collector = channel.createMessageCollector({ filter, max: 1, time: (5 * 60000) })
                    
                    const [collected, reason] = await once(collector, 'end')
                    
                    if (reason === 'limit') {
                        channel.bulkDelete([msg.id, collected.first().id]).catch(() => {})
                        answers.push({
                            name: question.name,
                            value: collected.first().content
                        })
                    }
                    else if (reason === 'time') throw ('O tempo para responder à pergunta se esgotou e o fomulário foi cancelado.')
                    else throw ('Ocorreu um erro durante a realização do formulário e este foi finalizado.')
                }
            }

            return answers
        }
    }
}