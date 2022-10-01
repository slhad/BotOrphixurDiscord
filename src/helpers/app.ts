/* eslint-disable no-async-promise-executor */
import { GroupUserInfoCard } from "bungie-api-ts/groupv2"
import express  from "express"
import fetch from "isomorphic-fetch"
import { client_id,client_secret } from "../../config.json"
import db, { getDiscordUser, saveDestinyMembershipData } from "../index"
import { getClan, getDestinyMembership as bungieGetDestinyMemberShip } from "./api"

export const BUNGIE_OAUTH_CLIENT_ID = process.env["BUNGIE_OAUTH_CLIENT_ID"] || client_id
export const BUNGIE_OAUTH_AUTHORIZE_URL = "https://www.bungie.net/en/OAuth/Authorize"
export const BUNGIE_OAUTH_TOKEN_URL = "https://www.bungie.net/platform/app/oauth/token/"


const app = express()

app.use((req, _res, next) => {
    console.log(req.url)
    next()
})

app.get("/register-start", (req, res) => {
    const { discordId } = req.query
    const bungieOauthUrl = `${BUNGIE_OAUTH_AUTHORIZE_URL}?response_type=code&client_id=${BUNGIE_OAUTH_CLIENT_ID}&state=${discordId}`
    res.redirect(307, bungieOauthUrl)
})

export interface TokenResponseData {
    access_token: string;
    membership_id: string;
}
export const getToken = async (autorizationCode: string) => {
    const tokenResponse = await fetch(BUNGIE_OAUTH_TOKEN_URL, {
        body: `grant_type=authorization_code&code=${autorizationCode}&client_id=${BUNGIE_OAUTH_CLIENT_ID}`,
        cache: "no-cache",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        redirect: "follow",
        referrer: "no-referrer"
    })
    if (tokenResponse.status !== 200) {
        throw Error(`Code erreur ${tokenResponse.status} de l'échange du jeton Bungie`)
    } console.log(tokenResponse)
    return tokenResponse.json() as Promise<TokenResponseData>
}
const getDestinyMembership = async (
    bungieMembershipId: string,
    accessToken: string
) => {
    const response = await bungieGetDestinyMemberShip(
        bungieMembershipId,
        accessToken
    )
    if (
        !response.Response ||
        (response.ErrorStatus && response.ErrorStatus !== "Success")
    ) {
        throw Error(
            `État d'erreur inattendu lors de la récupération des données d'adhésion : ${response.ErrorStatus}`
        )
    } console.log(accessToken)
    return response.Response.destinyMemberships
}
const handleMembershipData = async (
    discordId: string,
    membershipData: GroupUserInfoCard[]
) => {
    console.log(`Vous avez obtenu des données d'adhésion à Bungie pour l'ID d'utilisateur discord ${discordId}`)
    const PLATFORMS: { [key: number]: string } = {
        1: "xbox",
        2: "psn",
        3: "steam",
        4: "blizzard",
        5: "stadia"
    }
    const getPlatform = (membershipType: number) =>
        PLATFORMS[membershipType] || "Inconnue"

    const discordUser = getDiscordUser(discordId)

    const send = (message: string) => {
        console.log(message)
        discordUser && discordUser.send(message)

    }

    send("Adhésions Destiny trouvées :")

    await Promise.all(
        membershipData.map(({ membershipType, membershipId, displayName }) => {
            return new Promise<void>(async resolve => {
                const clanData = await getClan(membershipType, membershipId)

                send(
                    `Platform: ${getPlatform(
                        membershipType
                    )}, ID: ${membershipId}, displayName: ${displayName}`
                )
                if (clanData.Response.results.length > 0) {
                    const clan = clanData.Response.results[0].group
                    send(`Clans: ${clan.name}, ID: ${clan.groupId}`)
                }
                resolve()
            })
        }))
}
const getPrimaryDestinyMembership = async (
    membershipData: GroupUserInfoCard[]
) => {
    if (membershipData.length <= 1) {
        return membershipData[0]
    } return undefined
}
app.get("/register", async (req, res) => {
    const { code, state: discordId }:any = req.query
    if (code && discordId && discordId !== "Undefined") {

        const tokenData = await getToken(code)
        const {
            access_token: accessToken,
            membership_id: bungieMembershipId
        } = tokenData

        const membershipData = await getDestinyMembership(
            bungieMembershipId,
            accessToken
        )
        await handleMembershipData(discordId, membershipData)

        const primaryDestinyMembership = await getPrimaryDestinyMembership(
            membershipData
        )

        if (primaryDestinyMembership) {
            saveDestinyMembershipData(discordId, {
                membershipType: primaryDestinyMembership.membershipType,
                membershipId: primaryDestinyMembership.membershipId,
                displayName: primaryDestinyMembership.displayName
            })
        }
        
                    const responceCharter = await getDestinyProfile(
                membershipData[0].membershipType,
                membershipData[0].membershipId)
            const Character = responceCharter.Response.profile.data?.characterIds[0]
           
        db.run("INSERT INTO Discord(UserD, UserB, Token, shipsT, Character) VALUES(?, ?, ?, ?, ?)", [`${discordId}`, `${membershipData[0].membershipId}`, `${tokenData.access_token}`, `${membershipData[0].membershipType}`,`${Character}`])
       
        return res.json({
            membershipData,
        })
    }
    return res
        .status(400)
        .json({ error: "paramètres de requête de code et/ou d'état manquants" })
})

app.use((_req, res) => {

    res.status(400).json({ error: "rien" })

})

export default app
