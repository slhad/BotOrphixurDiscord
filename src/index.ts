import { Client, Collection } from "discord.js"
import fs from "fs"
import { Token } from "../config.json"
import { deployCommands } from "./deploy-commands"
import { handleCommand } from "./helpers/command"

deployCommands()

export type ClientHack = Client & { commands: Collection<unknown, unknown> }
const client: ClientHack = new Client({ intents: 65051 }) as ClientHack

client.commands = new Collection()
const commandFiles = fs.readdirSync("./dist/src/commands").filter(file => file.endsWith(".js"))

for (const file of commandFiles) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command = require(`./commands/${file}`)
    client.commands.set(command.default.data.name, command.default)
}

client.once("ready", () => {
    console.log("Bot OK!")
})

client.on("interactionCreate", async interaction => {
    if (interaction.isCommand()) handleCommand(client, interaction)
})

client.on("interactionCreate", async interaction => {
    if (!interaction.isSelectMenu()) return
    console.log(interaction)

if (interaction.customId === "select") {

    interaction.message.embeds[0].title += " " + interaction.values[0]

    await interaction.update({ content: "Le temps a été sélectionné", components: [], embeds: interaction.message.embeds })
}
})

client.on("messageCreate", message => {
    if (message.channel.id === "882334455065374761") {
        message.react("1️⃣")
    }
})

client.on("messageCreate", message => {
    if (message.channel.id === "882334455065374761") {
        message.react("2️⃣")
    }
})

client.on("messageCreate", message => {
    if (message.channel.id === "882334455065374761") {
        message.react("3️⃣")
    }
})

client.on("messageCreate", message => {
    if (message.channel.id === "882334455065374761") {
        message.react("4️⃣")
    }
})

client.on("messageCreate", message => {
    if (message.channel.id === "882334455065374761") {
        message.react("5️⃣")
    }
})

client.login(Token)
