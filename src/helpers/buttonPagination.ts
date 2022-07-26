import {MessageEmbed,MessageButton,MessageActionRow,MessageComponentInteraction,Message} from "discord.js"


const getButtons = (
    prev: boolean,
    nxt: boolean,
): MessageActionRow =>
    new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId("précédent")
            .setLabel("Précédent")
            .setStyle("PRIMARY")
            .setDisabled(prev),
        new MessageButton()
            .setCustomId("Suivant")
            .setLabel("Suivant")
            .setStyle("PRIMARY")
            .setDisabled(nxt)
    )

 export const buttonsPagination = async (msg: Message,pages: MessageEmbed[],timeout = 60000) => {
    if (!msg || !msg.channel) throw new Error("Le channel est inaccessible")
    if (!pages) throw new Error("Les pages n'ont pas de données")

    let page = 0
    const navButtonsRow = getButtons(
        page === 0,
        page === pages.length - 1,
    )
    const curPage = await msg.channel.send({
        embeds: [pages[page]],
        components: [navButtonsRow],
    })

    const filter = (i: MessageComponentInteraction): boolean =>
        (i.customId === "Suivant" || i.customId === "précédent") &&
        !i.user.bot &&
        i.user.id === msg.channel?.id
    const collector = msg.channel.createMessageComponentCollector({
        filter,
        time: timeout,
    })

    collector.on("collect", async (i: MessageComponentInteraction) => {
        await i.deferUpdate()
        if (i.customId === "précédent" && page > 0) page--
        else if (i.customId === "Suivant" && page + 1 < pages.length) page++
        curPage.edit({
            embeds: [pages[page]],
            components: [
                getButtons(
                    page === 0,
                    page === pages.length - 1,
                ),
            ],
        })
    })
    return curPage
}
