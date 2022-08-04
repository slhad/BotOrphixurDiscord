import { bungie } from "./api"
import { getManifest, destinyManifests } from "./manifest"

export const vendortest = {
  banshee: "672118013"
}

const summaryTtemHashes = {
  legendaire: "1239405002",
  LadernièreCité: "1737926756 ",
}

export async function getVendorDetail() {
  try{
    const { data } = await bungie.get(
      "/Destiny2/Manifest/DestinyVendorDefinition/672118013"
    )
    const locations = data.Response.displayProperties
    locations.displayProperties = await getVendorLocations
    console.log(locations)
    return locations
  }catch (erreur){
  console.log(erreur)
  return "Il y a une erreur"
}
}

export async function getVendorLocations(displayProperties:any) {
  const locationID = await getManifest(destinyManifests.DestinyVendorDefinition)
  if (locationID === vendortest.banshee) {return}
  const destination = await getManifest (destinyManifests.DestinyDestinationDefinition)
  if (destination === summaryTtemHashes.LadernièreCité) {return}
  destination.Object.value(displayProperties.name).summaryTtemHashes.LadernièreCité
 
  }
