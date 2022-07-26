import { Message } from "discord.js"

export const messageCreate = async (message:Message) => {
    if (message.channel.id === "   id du Channel    ") {
        message.react("0️⃣")
        message.react("1️⃣")
        message.react("2️⃣")
        message.react("3️⃣")
        message.react("4️⃣")
        message.react("5️⃣")
    }
}
