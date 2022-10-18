import { open } from "sqlite"
import  sqlite3  from "sqlite3"
import { stringify } from "querystring"
import _fetch from "isomorphic-fetch"
import { BUNGIE_OAUTH_TOKEN_URL, BUNGIE_OAUTH_CLIENT_ID, BUNGIE_OAUTH_CLIENT_SECRET } from "./app"

export interface UserDB {
    access_token:string
    expires_in: number
    refresh_token:string
    refresh_expires_in:number
}
export const getRefreshA = async(discordId:string) => {
    
    const now = Date.now()

    async function getuser(){ /* Récupération des colonnes Discord */
        const db1 = await open({
            filename: "main.db",
            driver: sqlite3.Database
        })
        const UserD = await db1.all(`SELECT userD FROM Discord WHERE userD = "${discordId}"`)
        const access_Token = await db1.all(`SELECT access_token FROM Discord WHERE userD = "${discordId}"`)
        const expires_In = await db1.all(`SELECT expires_in FROM Discord WHERE userD = "${discordId}"`)
        const expires_In_AT = await db1.all(`SELECT expires_in_AT FROM Discord WHERE userD = "${discordId}"`)
        const refresh_Token = await db1.all(`SELECT refresh_token FROM Discord WHERE userD = "${discordId}"`)
        const refresh_Expires_in = await db1.all(`SELECT refresh_expires_in FROM Discord WHERE userD = "${discordId}"`)
        const refresh_Expires_in_AT = await db1.all(`SELECT refresh_expires_in_AT FROM Discord WHERE userD = "${discordId}"`)
        const UserB = await db1.all(`SELECT userB FROM Discord WHERE userD = "${discordId}"`)
        const Membership_id = await db1.all(`SELECT membership_id FROM Discord WHERE userD = "${discordId}"`)
        const Character = await db1.all(`SELECT character FROM Discord WHERE userD = "${discordId}"`)
        const ShipT = await db1.all(`SELECT shipT FROM Discord WHERE userD = "${discordId}"`)
        
        return {
            userD: UserD[0].userD,
            access_token: access_Token[0].access_token,
            expires_in: expires_In[0].expires_in,
            expires_in_AT: expires_In_AT[0].expires_in_AT,
            refresh_token: refresh_Token[0].refresh_token,
            refresh_expires_in: refresh_Expires_in[0].refresh_expires_in,
            refresh_expires_in_AT: refresh_Expires_in_AT[0].refresh_expires_in_AT,
            userB: UserB[0].userB,
            discordId: UserD[0].userD,
            membership_id: Membership_id[0].membership_id,
            character: Character[0].character,
            shipT: ShipT[0].shipT
        }
}
async function refresh() {
    const response = await _fetch(BUNGIE_OAUTH_TOKEN_URL, {
        body: stringify({
            grant_type: "refresh_token",
            refresh_token: user.refresh_token,
            client_id: BUNGIE_OAUTH_CLIENT_ID,
            client_secret: BUNGIE_OAUTH_CLIENT_SECRET,
        }),
        cache: "no-cache",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
        redirect: "follow",
        referrer: "no-referrer"
    })
    if (response.status !== 200) {
        throw Error(`Status code ${response.status} from bungie token exchange`)
    }
    return response.json() as Promise<UserDB>
}

const user = await getuser()
const response = await refresh()
 
if(discordId == user.userD){
      /*  
    if(now <= user.expires_in_AT){
        const accessToken = response.access_token
        const expiresA = response.expires_in
        const expiresR = response.refresh_expires_in
        const refreshToken = response.refresh_token

    const db1 = await open({
        filename:"main.db",
        driver: sqlite3.Database
    })
    await db1.run(`UPDATE Discord SET expires_in_AT = ${now + expiresA}, refresh_token = "${refreshToken}", refresh_expires_in_AT = ${now + expiresR}, access_token = "${accessToken}" WHERE userD = "${discordId}"`)

    } else */
    if(now >= user.expires_in_AT){
        const accessToken = response.access_token
        const expiresA = response.expires_in
        const expiresR = response.refresh_expires_in
        const refreshToken = response.refresh_token
        

        const db1 = await open({
            filename:"main.db",
            driver: sqlite3.Database
        })
    await db1.run(`UPDATE Discord SET expires_in_AT = ${now + expiresA}, refresh_token = "${refreshToken}", refresh_expires_in_AT = ${now + expiresR}, access_token = "${accessToken}" WHERE userD = "${discordId}"`)
    }
  }
}
