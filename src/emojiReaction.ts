import {MessageReaction, User, PartialMessageReaction, PartialUser, Message} from "discord.js"

export
const emojiTable = [
    { emoji: "🟢", value: "Gambit" },
    { emoji: "🔴", value: "Pvp" },
    { emoji: "🟡", value: "Raid" },
    { emoji: "🟣", value: "Donjon" },
    { emoji: "⚪", value: "Armes" },
    { emoji: "🟤", value: "Contrat" },
    { emoji: "🟠", value: "Assaut" },
    { emoji: "⚫", value: "Nuit Noire" },
    { emoji: "👍", value: "Oui" },
    { emoji: "👎", value: "Non" },
    { emoji: "🟥", value: "Jardin du salut" },
    { emoji: "🟩", value: "Dernier voeux" },
    { emoji: "🟪", value: "Crypte de la pierre" },
    { emoji: "🟨", value: "Serment du disciple" },
    { emoji: "🟦", value: "Caveau de verre" },
    { emoji: "🤬", value: "Dualité" },
    { emoji: "🤯", value: "Fosse de l’hérésie" },
    { emoji: "🤪", value: "Le trône brisé" },
    { emoji: "😱", value: "Emprise de l’avarice" },
    { emoji: "🤤", value: "Prophétie" }
]

const translateEmojiToText = (emoji: string) => {
    return emojiTable.find((emojiItem) => emojiItem.emoji === emoji)?.value
}
export
const reactionManage = async (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {
    console.log(`User ${user.username} reacted with ${reaction.emoji.name}`)
    const embed = reaction.message.embeds[0]

    if(embed){

    const descriptionOrignal = embed.description?.split("\n")[0]
    const descriptionReactions = []
    for (const reactionMessage of reaction.message.reactions.cache) {
        const emoji = reactionMessage[1].emoji.name || "No emoji"
        const text = translateEmojiToText(emoji) || emoji

        const users = await reactionMessage[1].users.fetch()
        const userNames = []
        for (const user of users) {
            if (user[1].username !== "test789456431654321689") {
                userNames.push(user[1].username)
            }
        }
        descriptionReactions.push(`\nJoueurs qui ont voté ${text} : ${userNames}`)
    

    const newDescription = `${descriptionOrignal}${descriptionReactions}`
    embed.description = newDescription
    const message = (await reaction.message.fetch())
    await message.edit({ embeds: [embed] })
}

    }else if (Message){""}
}
