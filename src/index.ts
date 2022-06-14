import { Client, Collection, MessageReaction, User, PartialMessageReaction, PartialUser } from "discord.js"
import fs from "fs"
import { Token} from "../config.json"
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

client.on("interactionCreate", async interaction => {/**Pout toute les commandes */
    if (interaction.isCommand()) handleCommand(client, interaction)
})

client.on("interactionCreate", async interaction => {/**Pour MessageSelectMenu */
    if (!interaction.isSelectMenu()) return
    console.log(interaction)

if (interaction.customId === "select") {

    interaction.message.embeds[0].title += " " + interaction.values[0]

    await interaction.update({ content: "Le temps a été sélectionné", components: [], embeds: interaction.message.embeds })

}
})

client.on("messageCreate", message => {
    if (message.channel.id === "980469927075020820") {
        message.react("1️⃣")
        message.react("2️⃣")
        message.react("3️⃣")
        message.react("4️⃣")
        message.react("5️⃣")
    }
})

const reactionManage = async (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {
    console.log(`User ${user.username} reacted with ${reaction.emoji.name}`)
    const embed = reaction.message.embeds[0]

    // if (embed.author?.name !== "Sondage") {
    //     return
    // }

    const descriptionOrignal = embed.description?.split("\n")[0]
    const descriptionReactions = []
    for (const reactionMessage of reaction.message.reactions.cache) {
        const emoji = reactionMessage[1].emoji.name || "No emoji"
        const text = emoji

        const users = await reactionMessage[1].users.fetch()
        const userNames = []
        for (const user of users) {
            if (user[1].username !== "test789456431654321689") {
                userNames.push(user[1].username)
            }
        }
        descriptionReactions.push(`\nJoueurs qui ont voté ${text} : ${userNames}\n`)
    }


    const newDescription = `${descriptionOrignal}${descriptionReactions}`
    embed.description = newDescription
    const message = await reaction.message.fetch()
    await message.edit({ embeds: [embed] })
}
    client.on("messageReactionAdd", reactionManage)
    client.on("messageReactionRemove", reactionManage)


client.login(Token)
