import sqlite3 from "sqlite3"
import { open } from "sqlite"

const dbname = "main.db"
const dbFile = new sqlite3.Database(dbname, err => {
    if (err) throw err
    console.log(err)
    console.log("Database stated on main.db")
    db.run("CREATE TABLE IF NOT EXISTS Discord(userD, userB, membership_id, character, shipT, access_token, expires_in, expires_in_AT, refresh_token, refresh_expires_in, refresh_expires_in_AT)")
})

export const db = dbFile

export async function getData() {

    const db1 = await open({
        filename: "main.db",
        driver: sqlite3.Database
    })

    const access_Token = await db1.all("SELECT access_token FROM Discord")
    const expires_In = await db1.all("SELECT expires_in FROM Discord")
    const expires_In_AT = await db1.all("SELECT expires_in_AT FROM Discord")
    const refresh_Token = await db1.all("SELECT refresh_token FROM Discord")
    const refresh_Expires_in = await db1.all("SELECT refresh_expires_in FROM Discord")
    const refresh_Expires_in_AT = await db1.all("SELECT refresh_expires_in_AT FROM Discord")
    const UserB = await db1.all("SELECT userB FROM Discord")
    const UserD = await db1.all("SELECT userD FROM Discord")
    const Membership_id = await db1.all("SELECT membership_id FROM Discord")
    const Character = await db1.all("SELECT character FROM Discord")
    const ShipT = await db1.all("SELECT shipT FROM Discord")

    await db1.close

    return {
        access_token: access_Token[0].access_token,
        expires_in: expires_In[0].expires_in,
        expires_in_AT: expires_In_AT[0].expires_in_AT,
        refresh_token: refresh_Token[0].refresh_token,
        refresh_expires_in: refresh_Expires_in[0].refresh_expires_in,
        refresh_expires_in_AT: refresh_Expires_in_AT[0].refresh_expires_in_AT,
        userB: UserB[0].userB,
        userD: UserD[0].userD,
        membership_id: Membership_id[0].membership_id,
        character: Character[0].character,
        shipT: ShipT[0].shipT
    }
}
