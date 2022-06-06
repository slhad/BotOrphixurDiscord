import fs = require("fs")
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v10"
import { clientId, guildId, Token } from "../config.json"

const commands: any[] = []
const commandFiles = fs.readdirSync("./dist/src/commands").filter(file => file.endsWith(".js"))

for (const file of commandFiles) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command = require(`./commands/${file}`).default
    commands.push(command.data.toJSON())
}

const rest = new REST({ version: "10" }).setToken(Token)

export const deployCommands = async () => {
    try {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
        console.log("Commands OK!")
    } catch (error) {
        console.error(error)
    }
}