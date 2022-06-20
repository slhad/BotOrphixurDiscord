import {MessageReaction, User, PartialMessageReaction, PartialUser, Message } from "discord.js"

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

const ignoreUsers = () => {
    return (process.env["USERS_IGNORE"] || "Orphi Xur").split(",")
}

const timersMemory: { [key: string]: number } = {}
const timeIn = (timerId: string) => {
    timersMemory[timerId] = Date.now()
}

const timeOut = (timerId: string, prefix?: string) => {
    const timeElapsed = Date.now() - timersMemory[timerId]
    console.log(`${prefix ? prefix + " " : ""}Time elapsed ${timeElapsed} ms`)
}
export

const reactionManage = async (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {
    timeIn("reactionMessage")
    console.log(`User ${user.username} reacted with ${reaction.emoji.name}`)
    const embed = reaction.message.embeds[0]

    if(embed){

        const descriptionOrignal = embed.description?.split("\n")[0]
        const descriptionReactions: string[] = []
    
        const userNamesS = await Promise.all(reaction.message.reactions.cache
            .map((mr) => mr.users.fetch().then((users) => {
                return {
                    emoji: translateEmojiToText(mr.emoji.name || "No emoji"),
                    users: users.filter((u) => ignoreUsers().indexOf(u.username) < 0).map(u => u.username)
                }
            })))
    
        for (const foundEmojiAndUsers of userNamesS.filter((fa) => fa.users.length > 0)) {
            descriptionReactions.push(`\n Joueur qui ont voté pour ${(await foundEmojiAndUsers).emoji} : ${(await foundEmojiAndUsers).users.join(" / ")}`)
        }
        if (userNamesS.some((emoji) => emoji.users.length > 0)) {
        const newDescription = `${descriptionOrignal}${descriptionReactions.join("")}`
        embed.description = newDescription
        const message = await reaction.message.fetch()
        await message.edit({ embeds: [embed] })
        timeOut("reactionMessage", "User reaction in description")
    
    }else if (Message){""}

}}
