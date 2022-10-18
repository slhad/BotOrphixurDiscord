/* eslint-disable no-async-promise-executor */
import { GroupUserInfoCard } from "bungie-api-ts/groupv2"
import express from "express"
import fetch from "isomorphic-fetch"
import { client_id, client_secret, api_key } from "../../config.json"
import { getDiscordUser, saveDestinyMembershipData } from "../index"
import { getClan, getDestinyMembership as bungieGetDestinyMemberShip, getDestinyProfile } from "./api"
import { db, getData } from "./db"

export const BUNGIE_OAUTH_CLIENT_ID = process.env["BUNGIE_OAUTH_CLIENT_ID"] || client_id
export const BUNGIE_OAUTH_CLIENT_SECRET = process.env["BUNGIE_OAUTH_CLIENT_SECRET"] || client_secret
export const BUNGIE_OAUTH_AUTHORIZE_URL = "https://www.bungie.net/en/OAuth/Authorize"
export const BUNGIE_OAUTH_TOKEN_URL = "https://www.bungie.net/platform/app/oauth/token/"
export const API_KEY = process.env["API_KEY"] || api_key

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
    expires_in: number
    membership_id: string;
    refresh_expires_in: number
    refresh_token: string
}
export const getToken = async (authorizationCode: string) => {
    const tokenResponse = await fetch(BUNGIE_OAUTH_TOKEN_URL, {
        body: `client_id=${BUNGIE_OAUTH_CLIENT_ID}&client_secret=${BUNGIE_OAUTH_CLIENT_SECRET}&grant_type=authorization_code&code=${authorizationCode}`,
        cache: "no-cache",
        credentials: "include",
        headers: {
            "X-API-Key": API_KEY,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
    })
    if (tokenResponse.status !== 200) {
        throw Error(
            `Status code ${tokenResponse.status} from bungie token exchange`
        )
    }
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
    const { code, state: discordId } = req.query
    if (!(typeof code === "string" && typeof discordId === "string")) {
        return
    }
    if (code && discordId && discordId !== "Undefined") {

        const tokenData = await getToken(code)
        const {
            access_token: accessToken,
            membership_id: bungieMembershipId,
        } = tokenData


        const membershipData = await getDestinyMembership(
            bungieMembershipId,
            accessToken,

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

        const now = Date.now()


        db.run("INSERT INTO Discord(userD, userB, membership_id, character, shipT, access_token, expires_in, expires_in_AT, refresh_token, refresh_expires_in, refresh_expires_in_AT) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [`${discordId}`, `${membershipData[0].membershipId}`, `${tokenData.membership_id}`, `${Character}`, `${membershipData[0].membershipType}`, `${tokenData.access_token}`, `${tokenData.expires_in}`, "", `${tokenData.refresh_token}`, `${tokenData.refresh_expires_in}`, ""])

        const resp = await getData()

        const dateR = now + resp.refresh_expires_in
        const dateA = now + resp.refresh_expires_in

        db.run(`UPDATE Discord SET expires_in_AT = ${dateA} WHERE ${discordId}`)
        db.run(`UPDATE Discord SET refresh_expires_in_AT = ${dateR} WHERE ${discordId}`)

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
