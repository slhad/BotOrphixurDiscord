import axios from "axios"
import { getProfile,getVendors } from "bungie-api-ts/destiny2"
import { DestinyComponentType } from "bungie-api-ts/destiny2/interfaces"
import { getGroupsForMember } from "bungie-api-ts/groupv2/api"
import { GroupsForMemberFilter, GroupType } from "bungie-api-ts/groupv2/interfaces"
import { HttpClientConfig } from "bungie-api-ts/http"
import { getMembershipDataById } from "bungie-api-ts/user"
import fetch from "isomorphic-fetch"
import { api_key } from "../../config.json"
import { getData } from "./db"

const API_KEY = process.env["API_KEY"] || api_key
  
export const bungie = axios.create({
  baseURL: "https://www.bungie.net/",
  timeout: 10000,
  withCredentials: true,
  headers: {
      "X-API-Key": API_KEY,
  }
  }
)

export const getManifest = () => bungie.get("/Platform/Destiny2/Manifest/")
export const bungieAuthedFetch = (accessToken:string) => async (
  config: HttpClientConfig,
) => {
  try {
    const headers: { [key:string]: string } = {
      "X-API-Key": API_KEY,
    }
    if (accessToken) {
      headers.Authorization = `bearer ${accessToken}`
      await headers.response
      
    } 
    const url = `${config.url}${
      config.params
      ? "?" +
      Object.entries(config.params).map(
        ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
      : ""
    }`
    
    console.log(`aller chercher${url}`)
    const response = await fetch(url, { headers, credentials: "include"})
    return await response.json()
  } catch (e) {
  console.log(e)
  return{}
  }
}

export const getDestinyMembership = async (
  bungieMembershipId:string,
  accessToken: string,
) => {
  return getMembershipDataById(bungieAuthedFetch(accessToken), {
    membershipId: bungieMembershipId,
    membershipType: 254
  })
}

export const getDestinyProfile = async (
  membershipType: number,
  destinyMembershipId: string,
) => {
  return getProfile(bungieAuthedFetch(" "), {
    membershipType: membershipType,
    destinyMembershipId: destinyMembershipId,
    components: [DestinyComponentType.Characters,DestinyComponentType.Profiles]
  })
}

export const getClan = async (
  membershipType: number,
  destinyMembershipId: string,
) => {
  return getGroupsForMember(bungieAuthedFetch(" "), {
    membershipType: membershipType,
    membershipId: destinyMembershipId,
    groupType: GroupType.Clan,
    filter: GroupsForMemberFilter.All
  })
}

export const vendors = async() => {
  const response = await getData()
  const access_token = response.access_token
  return getVendors(bungieAuthedFetch(access_token), {
    characterId: response.character,
    membershipType: response.shipT,
    destinyMembershipId: response.userB,
    components:[DestinyComponentType.Vendors,
      DestinyComponentType.VendorCategories,
      DestinyComponentType.VendorSales,
      DestinyComponentType.VendorReceipts,]
  }
  )
}
