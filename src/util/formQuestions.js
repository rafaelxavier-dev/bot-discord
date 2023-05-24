module.exports = [
    {
        question: 'Qual o seu nome?(Real)',
        name: 'Nome'
    },
    {
        question: 'Qual o nome do seu personagem?',
        name: 'Personagem'
    },
    {
        question: 'Quantos anos você tem?',
        name: 'Idade'
    },
    {
        question: 'Joga a quanto tempo?',
        name: 'Tempo de experiência'
    },
    {
        question: 'Qual o período disponível para a cidade? (Exemplo: 14h - 20h)',
        name: 'Tempo para jogar'
    },
    {
        question: 'Número na cidade?',
        name: 'Número de celular'
    },
    {
        question: 'Tem experiência em PVP?(Selecione a opção)',
        placeholder: 'Sim ou Não',
        customId: 'PVP',
        minValues: 1,
        maxValues: 1,
        options: [
            {
                label: 'Sim',
                value: 'sim',
                description: 'Tem experiência.'
            },
            {
                label: 'Não',
                value: 'nao',
                description: 'Não tem experiência.'
            }
        ]
    },
    {
        question: 'Tem experiência em ações?(Selecione a opção)',
        placeholder: 'Sim ou Não',
        customId: 'Ações',
        minValues: 1,
        maxValues: 1,
        options: [
            {
                label: 'Sim',
                value: 'sim',
                description: 'Tem experiência.'
            },
            {
                label: 'Não',
                value: 'nao',
                description: 'Não tem experiência.'
            }
        ]
    },
    {
        question: 'Porque deveriamos te aceitar na família?',
        name: 'Razão'
    },

]