const { Manager } = require('erela.js')

module.exports = (client) => {
    return new Manager({
        nodes: [{
          host: "localhost",
          password: "lavalink1234",
          port: 2333
        }],
        send: (id, payload) => {
          const guild = client.guilds.cache.get(id)
          if (guild) guild.shard.send(payload)
        }
      })
        .on("nodeConnect", node => console.log(`Node "${node.options.identifier}" connected.`))
        .on("nodeError", (node, error) => console.log(
          `Node "${node.options.identifier}" encountered an error: ${error.message}.`
        ))
        .on("trackStart", (player, track) => {
          const channel = client.channels.cache.get(player.textChannel)
          channel.send(`Tocando agora: \`${track.title}\`, solicitado por ${track.requester.tag.toString()}.`)
        })
        .on("queueEnd", player => {
          const channel = client.channels.cache.get(player.textChannel)
          channel.send("A fila acabou.")
          player.destroy()
        });
}