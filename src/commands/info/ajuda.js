const { Interaction } = require('discord.js')
const Command = require('../../structures/Command')
const { EmbedBuilder } = require('discord.js')

module.exports = class extends Command{
    constructor(client){
        super(client,{
            name: 'ajuda',
            description: 'Mostra os comandos do Bot',
        })
    }

    run = (Interaction) => {


        Interaction.reply({ content: '```COMANDOS \n/ajuda - Mostra todos os comandos do Bot. \n/ping - Monstra o Ping do Bot. \n/ban - Bane um mebro do servidor. \n/kick - Expulsa do servidor. \n/delete - Apaga uma quantidade deseja de mensagens em um canal(Máximo 100 por vez). \n/embed - Cria uma mensagem Embed. \n/falar - Faz com o que o Bot diga algo em um canal. \n/recrutamento - Muda o Status de recrutamento no canal desejado. \n/form - Inícia um formulário. \n/contador - Abre um contador manual.  \nCONFIGURAÇÕES \nTicket - É criado utilizando o /config ticket mensagem passando como valor o canal de desejado. \nMensagem de Boas-Vindas - É configurado utilizando o /config welcome canal_entrada passando como valor o canal desejado. \nForm - É configurado utilizando o /config form canal_form passando como valor o canal onde deseja as respostas.```', ephemeral: true })
        .then(() => Interaction.reply({content: `Mensagem enviada com sucesso no canal \`${canal.name}\`.`, ephemeral: true}))
        .catch(() => Interaction.reply({content: `ERRO > Erro ao enviar a mensagem no canal.`, ephemeral: true}))

    }
}

