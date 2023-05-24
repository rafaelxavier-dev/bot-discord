const { Client } = require('discord.js')
const { readdirSync } = require('fs')
const { join } = require('path')
const { connect } = require('mongoose')

const Models = require('../database/models/Models')
const erelaManager = require('./Manager')

module.exports = class extends Client{
    constructor (options){
        super(options)

        this.commands = []
        this.loadCommands()
        this.loadEvents()
        this.manager = erelaManager(this)
        
    }

    registryCommands(){
        //this.guilds.cache.get('1014039157296861215').commands.set(this.commands)
        this.application.commands.set(this.commands)
    }

    loadCommands(path = 'src/commands'){
        const categories = readdirSync(path)

        for(const category of categories){
            const commands = readdirSync(`${path}/${category}`)

            for(const command of commands){
                const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`))
                const cmd = new (commandClass)(this)

                this.commands.push(cmd)
            }
        }
    }

    loadEvents(path = 'src/events') {
        const categories = readdirSync(path)

        for(const category of categories){
            const events = readdirSync(`${path}/${category}`)

            for(const event of events){
                const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`))
                const evt = new (eventClass)(this)

                this.on(evt.name, evt.run)
            }
        }
    }

    async connectToDatabase() {
        const connection = await connect(process.env.MONGO_URL, {
            autoIndex: false, // Don't build indexes
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
        })

        console.log('Database conectada com sucesso!')

        this.db = { connection, ...Models }
    }
}