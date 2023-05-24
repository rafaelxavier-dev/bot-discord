const { Schema, model } = require ('mongoose')

const guildSchema = new Schema({
    _id: String,
    welcome:{
        channel: String
    },
    form:{
        channel: String
    }
})

module.exports = model('guilds', guildSchema)