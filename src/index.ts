import { Client, Collection } from "discord.js"
import fs from "fs"
import https from "https"
import sqlite3 from "sqlite3"
import { clientId, Token } from "../config.json"
import { BungieMembershipType } from "../node_modules/bungie-api-ts/user"
import { deployCommands } from "./deploy-commands"
import { reactionManage } from "./emojiReaction"
import { handleCommand } from "./helpers/command"
import manifest from "./helpers/manifest"
import { messageCreate } from "./votes"
import app from "./helpers/app"

const DISCORD_BOT_CLIENT_ID = process.env["API_KEY"] || clientId

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

const setClientIdle = async () => {
    client.user && (await client.user.setPresence({ status: "idle" }))
}

const BOT_OAUTH_URL = `https://discordapp.com/api/oauth2/authorize?client_id=${DISCORD_BOT_CLIENT_ID}&permissions=65051&scope=bot`

client.once("ready", () => {
    console.log("Bot OK!")
    console.log(`va sur ce lien ${BOT_OAUTH_URL}`)
})


client.on("interactionCreate", async interaction => {/**Pout toute les commandes */
    if (interaction.isCommand()) handleCommand(client, interaction,)

})

client.on("interactionCreate", async interaction => {/**Pour MessageSelectMenu */
    if (!interaction.isSelectMenu()) return
    console.log(interaction)

    if (interaction.customId === "select") {

        interaction.message.embeds[0].title += " " + interaction.values[0]

        await interaction.update({ content: "Le temps a été sélectionné", components: [], embeds: interaction.message.embeds })
    }
})

export const getDiscordUser = (id: string) => {
    return client.users.cache && client.users.cache.get(id)
}

interface DestinyMembershipData {
    membershipType: BungieMembershipType;
    membershipId: string;
    displayName: string;
}

const discordDestinyMembershipMap = new Map<string, DestinyMembershipData>()
export const saveDestinyMembershipData = (
    discordId: string,
    data: DestinyMembershipData
) => {
    discordDestinyMembershipMap.set(discordId, data)
}


const PROT = 8000

const server = https.createServer({
    key: fs.readFileSync("./src/helpers/pem/localhost-key.pem"),
    cert: fs.readFileSync("./src/helpers/pem/localhost.pem")
},
app
)

server.listen(PROT, () => {
    console.log(`App écoute sur le port: ${PROT}`)
})

const shutdown = async () => {
    console.log("Fermeture de l'application...")
    await new Promise<void>(resolve => server.close(() => resolve()))
    console.log("Définition de l'état du bot sur inactif...")
    await setClientIdle
}
process.on("SIGINT", async () => {
    await shutdown()
    process.exit()
})
process.once("SIGUSR2", async () => {
    await shutdown()
    process.kill(process.pid, "SIGUSR2")
})

const dbname = "main.db"
const db = new sqlite3.Database(dbname, err => {
    if (err) throw err
    console.log(err)
    console.log("Database stated on dbname.db")
        db.run("CREATE TABLE IF NOT EXISTS Discord(UserD, UserB, Token, shipsT)")
        
})

client.on("messageReactionAdd", reactionManage)
client.on("messageReactionRemove", reactionManage)
client.on("messageCreate", messageCreate)
manifest.fetchManifest()
export default (db)

client.login(Token)
