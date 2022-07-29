import { api_key } from "../../config.json"
import { bungie } from "./api"
import axios from "axios"

const bungieManifest = axios.create({
  baseURL: "https://www.bungie.net/",
  headers: {
    Accept: "*/*",
    "X-API-Key": api_key,
  },
})

bungieManifest.defaults.headers.post["Content-Type"] = "application/json"


export const destinyManifests = {
  DestinyNodeStepSummaryDefinition: "DestinyNodeStepSummaryDefinition",
  DestinyArtDyeChannelDefinition: "DestinyArtDyeChannelDefinition",
  DestinyArtDyeReferenceDefinition: "DestinyArtDyeReferenceDefinition",
  DestinyPlaceDefinition: "DestinyPlaceDefinition",
  DestinyActivityDefinition: "DestinyActivityDefinition",
  DestinyActivityTypeDefinition: "DestinyActivityTypeDefinition",
  DestinyClassDefinition: "DestinyClassDefinition",
  DestinyGenderDefinition: "DestinyGenderDefinition",
  DestinyInventoryBucketDefinition: "DestinyInventoryBucketDefinition",
  DestinyRaceDefinition: "DestinyRaceDefinition",
  DestinyTalentGridDefinition: "DestinyTalentGridDefinition",
  DestinyUnlockDefinition: "DestinyUnlockDefinition",
  DestinySandboxPerkDefinition: "DestinySandboxPerkDefinition",
  DestinyStatGroupDefinition: "DestinyStatGroupDefinition",
  DestinyProgressionMappingDefinition: "DestinyProgressionMappingDefinition",
  DestinyFactionDefinition: "DestinyFactionDefinition",
  DestinyVendorGroupDefinition: "DestinyVendorGroupDefinition",
  DestinyRewardSourceDefinition: "DestinyRewardSourceDefinition",
  DestinyUnlockValueDefinition: "DestinyUnlockValueDefinition",
  DestinyRewardMappingDefinition: "DestinyRewardMappingDefinition",
  DestinyRewardSheetDefinition: "DestinyRewardSheetDefinition",
  DestinyItemCategoryDefinition: "DestinyItemCategoryDefinition",
  DestinyDamageTypeDefinition: "DestinyDamageTypeDefinition",
  DestinyActivityModeDefinition: "DestinyActivityModeDefinition",
  DestinyMedalTierDefinition: "DestinyMedalTierDefinition",
  DestinyAchievementDefinition: "DestinyAchievementDefinition",
  DestinyActivityGraphDefinition: "DestinyActivityGraphDefinition",
  DestinyActivityInteractableDefinition: "DestinyActivityInteractableDefinition",
  DestinyBondDefinition: "DestinyBondDefinition",
  DestinyCharacterCustomizationCategoryDefinition: "DestinyCharacterCustomizationCategoryDefinition",
  DestinyCharacterCustomizationOptionDefinition: "DestinyCharacterCustomizationOptionDefinition",
  DestinyCollectibleDefinition: "DestinyCollectibleDefinition",
  DestinyDestinationDefinition: "DestinyDestinationDefinition",
  DestinyEntitlementOfferDefinition: "DestinyEntitlementOfferDefinition",
  DestinyEquipmentSlotDefinition: "DestinyEquipmentSlotDefinition",
  DestinyStatDefinition: "DestinyStatDefinition",
  DestinyInventoryItemDefinition: "DestinyInventoryItemDefinition",
  DestinyInventoryItemLiteDefinition: "DestinyInventoryItemLiteDefinition",
  DestinyItemTierTypeDefinition: "DestinyItemTierTypeDefinition",
  DestinyLocationDefinition: "DestinyLocationDefinition",
  DestinyLoreDefinition: "DestinyLoreDefinition",
  DestinyMaterialRequirementSetDefinition: "DestinyMaterialRequirementSetDefinition",
  DestinyMetricDefinition: "DestinyMetricDefinition",
  DestinyObjectiveDefinition: "DestinyObjectiveDefinition",
  DestinyPlatformBucketMappingDefinition: "DestinyPlatformBucketMappingDefinition",
  DestinyPlugSetDefinition: "DestinyPlugSetDefinition",
  DestinyPowerCapDefinition: "DestinyPowerCapDefinition",
  DestinyPresentationNodeDefinition: "DestinyPresentationNodeDefinition",
  DestinyProgressionDefinition: "DestinyProgressionDefinition",
  DestinyProgressionLevelRequirementDefinition: "DestinyProgressionLevelRequirementDefinition",
  DestinyRecordDefinition: "DestinyRecordDefinition",
  DestinyRewardAdjusterPointerDefinition: "DestinyRewardAdjusterPointerDefinition",
  DestinyRewardAdjusterProgressionMapDefinition: "DestinyRewardAdjusterProgressionMapDefinition",
  DestinyRewardItemListDefinition: "DestinyRewardItemListDefinition",
  DestinySackRewardItemListDefinition: "DestinySackRewardItemListDefinition",
  DestinySandboxPatternDefinition: "DestinySandboxPatternDefinition",
  DestinySeasonDefinition: "DestinySeasonDefinition",
  DestinySeasonPassDefinition: "DestinySeasonPassDefinition",
  DestinySocketCategoryDefinition: "DestinySocketCategoryDefinition",
  DestinySocketTypeDefinition: "DestinySocketTypeDefinition",
  DestinyTraitDefinition: "DestinyTraitDefinition",
  DestinyTraitCategoryDefinition: "DestinyTraitCategoryDefinition",
  DestinyUnlockCountMappingDefinition: "DestinyUnlockCountMappingDefinition",
  DestinyUnlockEventDefinition: "DestinyUnlockEventDefinition",
  DestinyUnlockExpressionMappingDefinition: "DestinyUnlockExpressionMappingDefinition",
  DestinyVendorDefinition: "DestinyVendorDefinition",
  DestinyMilestoneDefinition: "DestinyMilestoneDefinition",
  DestinyActivityModifierDefinition: "DestinyActivityModifierDefinition",
  DestinyReportReasonCategoryDefinition: "DestinyReportReasonCategoryDefinition",
  DestinyArtifactDefinition: "DestinyArtifactDefinition",
  DestinyBreakerTypeDefinition: "DestinyBreakerTypeDefinition",
  DestinyChecklistDefinition: "DestinyChecklistDefinition",
  DestinyEnergyTypeDefinition: "DestinyEnergyTypeDefinition",
}

export async function getManifest(destinyManifest:string) {
  try {
    const { data } = await bungie.get("/Destiny2/Manifest/")
    const enManifests = data.Response.jsonWorldComponentContentPaths.en
    const manifest = enManifests[destinyManifest]

    const downloadedManifest = await bungieManifest.get(manifest)
    return downloadedManifest.data
  } catch (err) {
    console.log(err)
    return "Il y a une erreur"
  }
}
