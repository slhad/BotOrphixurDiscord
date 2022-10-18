import manifest from "./manifest"
import { vendors } from "./api"
import { bansheeV, xurV, ada_1V, eclat, lumen, Cryo_électriques, Solaires, Stase, Abyssaux, Cinétiques, Tour, ZME, Nessos } from "../constantes"


export async function getItemB() {
  const banshee = await vendors()
  const vendorData = banshee.Response.sales.data as any
  const saledata = Object.values(vendorData[bansheeV].saleItems)
  const salecosts = saledata.map(({ costs }: any) => costs) as any
  const idItem = saledata.map(({ itemHash }: any) => itemHash) as any

  return {idItem:idItem, salecosts:salecosts}
}

export async function getVendorDetailB() {
  try {
    const idItem = await getItemB()
  
  const item_1 = manifest.t(idItem.idItem[7])
  const item_2 = manifest.t(idItem.idItem[8])
  const item_3 = manifest.t(idItem.idItem[9])
  const item_4 = manifest.t(idItem.idItem[10])
  const item_5 = manifest.t(idItem.idItem[11])
  const item_6 = manifest.t(idItem.idItem[12])

  const mod_1 = manifest.t(idItem.idItem[1])
  const mod_2 = manifest.t(idItem.idItem[2])
  const mod_3 = manifest.t(idItem.idItem[3])
  const mod_4 = manifest.t(idItem.idItem[4])

  const descriptionM_1 = manifest.t(mod_1.perks[0].perkHash)
  const descriptionM_2 = manifest.t(mod_2.perks[0].perkHash)
  const descriptionM_3 = manifest.t(mod_3.perks[0].perkHash)
  const descriptionM_4 = manifest.t(mod_4.perks[0].perkHash)

  const lumen_1 = idItem.salecosts[7][1].quantity
  const eclat_1 = idItem.salecosts[7][0].quantity

  let domageType_1 = "" as any
  
  if (item_1.defaultDamageType == 1){
    domageType_1 = Cinétiques
  } else if (item_1.defaultDamageType == 2){
    domageType_1 = Cryo_électriques
  } else if (item_1.defaultDamageType == 3){
    domageType_1 = Solaires
  } else if(item_1.defaultDamageType == 4){
    domageType_1 = Abyssaux
  } else if(item_1.defaultDamageType == 6){
    domageType_1 = Stase
  }

  let domageType_2 = "" as any
  
  if (item_2.defaultDamageType == 1){
    domageType_2 = Cinétiques
  } else if (item_2.defaultDamageType == 2){
    domageType_2 = Cryo_électriques
  } else if (item_2.defaultDamageType == 3){
    domageType_2 = Solaires
  } else if(item_2.defaultDamageType == 4){
    domageType_2 = Abyssaux
  } else if(item_2.defaultDamageType == 6){
    domageType_2 = Stase
  }

  let domageType_3 = "" as any
  
  if (item_3.defaultDamageType == 1){
    domageType_3 = Cinétiques
  } else if (item_3.defaultDamageType == 2){
    domageType_3 = Cryo_électriques
  } else if (item_3.defaultDamageType == 3){
    domageType_3 = Solaires
  } else if(item_3.defaultDamageType == 4){
    domageType_3 = Abyssaux
  } else if(item_3.defaultDamageType == 6){
    domageType_3 = Stase
  }

  let domageType_4 = "" as any
  
  if (item_4.defaultDamageType == 1){
    domageType_4 = Cinétiques
  } else if (item_4.defaultDamageType == 2){
    domageType_4 = Cryo_électriques
  } else if (item_4.defaultDamageType == 3){
    domageType_4 = Solaires
  } else if(item_4.defaultDamageType == 4){
    domageType_4 = Abyssaux
  } else if(item_4.defaultDamageType == 6){
    domageType_4 = Stase
  }

  let domageType_5 = "" as any
  
  if (item_5.defaultDamageType == 1){
    domageType_5 = Cinétiques
  } else if (item_5.defaultDamageType == 2){
    domageType_5 = Cryo_électriques
  } else if (item_5.defaultDamageType == 3){
    domageType_5 = Solaires
  } else if(item_5.defaultDamageType == 4){
    domageType_5 = Abyssaux
  } else if(item_5.defaultDamageType == 6){
    domageType_5 = Stase
  }

  let domageType_6 = "" as any
  
  if (item_6.defaultDamageType == 1){
    domageType_6 = Cinétiques
  } else if (item_6.defaultDamageType == 2){
    domageType_6 = Cryo_électriques
  } else if (item_6.defaultDamageType == 3){
    domageType_6 = Solaires
  } else if(item_6.defaultDamageType == 4){
    domageType_6 = Abyssaux
  } else if(item_6.defaultDamageType == 6){
    domageType_6 = Stase
  }

    const bansheeResponse = manifest.t(bansheeV)
    const manifests = bansheeResponse.displayProperties


    return {
      destination: Tour,
      vendeur: manifests,
      infoBrutes: bansheeResponse,
      display_Item_1: item_1, display_Item_2: item_2, display_Item_3: item_3, display_Item_4: item_4, display_Item_5: item_5, display_Item_6: item_6, 
      lumen_1 : lumen_1,  eclat_1 : eclat_1,
      mod_1 : mod_1, mod_2 : mod_2, mod_3 : mod_3, mod_4: mod_4,

      mods_1: [{
        name: `${mod_1.displayProperties.name}`, description: `${descriptionM_1.displayProperties.description}`,
        fields_M1: [{name:"Ressources :" ,value: `**Lumens** : \u0020 10 000\u0020${lumen}`}],
      }],

      mods_2: [{
        name: `${mod_2.displayProperties.name}`, description: `${descriptionM_2.displayProperties.description}`,
        fields_M2: [{name:"Ressources :" ,value: `**Lumens** : \u0020 10 000\u0020${lumen}`}],
      }],

      mods_3: [{
        name: `${mod_3.displayProperties.name}`, description: `${descriptionM_3.displayProperties.description}`,
        fields_M3: [{name:"Ressources :" ,value: `**Lumens** : \u0020 10 000\u0020${lumen}`}],
      }],

      mods_4: [{
        name: `${mod_4.displayProperties.name}`, description: `${descriptionM_4.displayProperties.description}`,
        fields_M4: [{name:"Ressources :" ,value: `**Lumens** : \u0020 10 000\u0020${lumen}`}],
      }],

      armes_1: [{
        name: `${item_1.displayProperties.name}`, description: `**Voir les stats de **: [${item_1.displayProperties.name}](https://www.light.gg/db/fr/items/${idItem.idItem[7]})\n\u200B`+" "+"\n\u200B"+`${item_1.itemTypeAndTierDisplayName}\u0020${domageType_1}\n\u200B`+" "+`\n\u200B${item_1.flavorText}\n\u200B`,
        fields_1: [{name:"Ressources :" ,value: `**Lumens** : \u0020 ${lumen_1}\u0020${lumen} \n**Éclats légendaires** : \u0020 ${eclat_1}\u0020${eclat}`}],
      }],

      armes_2: [{
        name: `${item_2.displayProperties.name}`, description: `**Voir les stats de **: [${item_2.displayProperties.name}](https://www.light.gg/db/fr/items/${idItem.idItem[8]})\n\u200B`+" "+"\n\u200B"+`${item_2.itemTypeAndTierDisplayName}\u0020${domageType_2}\n\u200B`+" "+`\n\u200B${item_2.flavorText}\n\u200B`,
        fields_2: [{name:"Ressources :" ,value: `**Lumens** : \u0020 ${lumen_1}\u0020${lumen} \n **Éclats légendaires** : \u0020 ${eclat_1}\u0020${eclat}`}]
      }],

      armes_3: [{
        name: `${item_3.displayProperties.name}`, description: `**Voir les stats de **: [${item_3.displayProperties.name}](https://www.light.gg/db/fr/items/${idItem.idItem[9]})\n\u200B`+" "+"\n\u200B"+`${item_3.itemTypeAndTierDisplayName}\u0020${domageType_3}\n\u200B`+" "+`\n\u200B${item_3.flavorText}\n\u200B`,
        fields_3: [{name:"Ressources :" ,value: `**Lumens** : \u0020 ${lumen_1}\u0020${lumen} \n **Éclats légendaires** : \u0020 ${eclat_1}\u0020${eclat}`}]
      }],

      armes_4: [{
        name: `${item_4.displayProperties.name}`, description: `**Voir les stats de **: [${item_4.displayProperties.name}](https://www.light.gg/db/fr/items/${idItem.idItem[10]})\n\u200B`+" "+"\n\u200B"+`${item_4.itemTypeAndTierDisplayName}\u0020${domageType_4}\n\u200B`+" "+`\n\u200B${item_4.flavorText}\n\u200B`,
        fields_4: [{name:"Ressources :" ,value: `**Lumens** : \u0020 ${lumen_1}\u0020${lumen} \n **Éclats légendaires** : \u0020 ${eclat_1}\u0020${eclat}`}]
      }],

      armes_5: [{
        name: `${item_5.displayProperties.name}`, description: `**Voir les stats de **: [${item_5.displayProperties.name}](https://www.light.gg/db/fr/items/${idItem.idItem[11]})\n\u200B`+" "+"\n\u200B"+`${item_5.itemTypeAndTierDisplayName}\u0020${domageType_5}\n\u200B`+" "+`\n\u200B${item_5.flavorText}\n\u200B`,
        fields_5: [{name:"Ressources :" ,value: `**Lumens** : \u0020 ${lumen_1}\u0020${lumen} \n **Éclats légendaires** : \u0020 ${eclat_1}\u0020${eclat}`}]
      }],
      
      armes_6: [{
        name: `${item_6.displayProperties.name}`, description: `**Voir les stats de **: [${item_6.displayProperties.name}](https://www.light.gg/db/fr/items/${idItem.idItem[10]})\n\u200B`+" "+"\n\u200B"+`${item_6.itemTypeAndTierDisplayName}\u0020${domageType_6}\n\u200B`+" "+`\n\u200B${item_6.flavorText}\n\u200B`,
        fields_6: [{name:"Ressources :" ,value: `**Lumens** : \u0020 ${lumen_1}\u0020${lumen} \n **Éclats légendaires** : \u0020 ${eclat_1}\u0020${eclat}`}]

      }]
    }
  } catch (error) {
    console.log(error)
  }
}


export async function getItemX() {
  const xur = await vendors()
  const location = xur.Response.vendors.data  as any
  const locationHash = Object.values(location[xurV])
  const vendorData = xur.Response.sales.data as any
  const saledata = Object.values(vendorData[xurV].saleItems)
  const salecosts = saledata.map(({ costs }: any) => costs) as any
  const idItem = saledata.map(({ itemHash }: any) => itemHash) as any

 return {idItem:idItem, salecosts:salecosts, location: locationHash}
}

export async function getVendorDetailX() {
  try {

  const idItem = await getItemX()
  
  const item_1 = manifest.t(idItem.idItem[0])
  const item_2 = manifest.t(idItem.idItem[1])
  const item_3 = manifest.t(idItem.idItem[4])
  const item_4 = manifest.t(idItem.idItem[5])
  const item_5 = manifest.t(idItem.idItem[6])
  const item_6 = manifest.t(idItem.idItem[7])
  const item_7 = manifest.t(idItem.idItem[8])
  const item_8 = manifest.t(idItem.idItem[9])
  const item_9 = manifest.t(idItem.idItem[10])
  const item_10 = manifest.t(idItem.idItem[11])
  const item_11 = manifest.t(idItem.idItem[12])
  const item_12 = manifest.t(idItem.idItem[13])

  const eclat_1 = idItem.salecosts[0][0].quantity
  const eclat_2 = idItem.salecosts[1][0].quantity
  const eclat_3 = idItem.salecosts[4][0].quantity
  const eclat_4 = idItem.salecosts[5][0].quantity
  const eclat_5 = idItem.salecosts[6][0].quantity

  const eclat_6 = idItem.salecosts[7][0].quantity
  const lumen_6 = idItem.salecosts[7][1].quantity

  const eclat_7 = idItem.salecosts[8][0].quantity
  const lumen_7 = idItem.salecosts[8][1].quantity

  const eclat_8 = idItem.salecosts[9][0].quantity
  const lumen_8 = idItem.salecosts[9][1].quantity

  const eclat_9 = idItem.salecosts[10][0].quantity
  const lumen_9 = idItem.salecosts[10][1].quantity

  const eclat_10 = idItem.salecosts[11][0].quantity
  const lumen_10 = idItem.salecosts[11][1].quantity

  const eclat_11 = idItem.salecosts[12][0].quantity
  const lumen_11 = idItem.salecosts[12][1].quantity

  const eclat_12 = idItem.salecosts[13][0].quantity
  const lumen_12 = idItem.salecosts[13][1].quantity

  let domageType_1 = "" as any
  
  if (item_1.defaultDamageType == 1){
    domageType_1 = Cinétiques
  } else if (item_1.defaultDamageType == 2){
    domageType_1 = Cryo_électriques
  } else if (item_1.defaultDamageType == 3){
    domageType_1 = Solaires
  } else if(item_1.defaultDamageType == 4){
    domageType_1 = Abyssaux
  } else if(item_1.defaultDamageType == 6){
    domageType_1 = Stase
  }

  let domageType_2 = "" as any
  
  if (item_2.defaultDamageType == 1){
    domageType_2 = Cinétiques
  } else if (item_2.defaultDamageType == 2){
    domageType_2 = Cryo_électriques
  } else if (item_2.defaultDamageType == 3){
    domageType_2 = Solaires
  } else if(item_2.defaultDamageType == 4){
    domageType_2 = Abyssaux
  } else if(item_2.defaultDamageType == 6){
    domageType_2 = Stase
  }

  let domageType_3 = "" as any
  
  if (item_3.defaultDamageType == 1){
    domageType_3 = Cinétiques
  } else if (item_3.defaultDamageType == 2){
    domageType_3 = Cryo_électriques
  } else if (item_3.defaultDamageType == 3){
    domageType_3 = Solaires
  } else if(item_3.defaultDamageType == 4){
    domageType_3 = Abyssaux
  } else if(item_3.defaultDamageType == 6){
    domageType_3 = Stase
  }

  let domageType_4 = "" as any
  
  if (item_4.defaultDamageType == 1){
    domageType_4 = Cinétiques
  } else if (item_4.defaultDamageType == 2){
    domageType_4 = Cryo_électriques
  } else if (item_4.defaultDamageType == 3){
    domageType_4 = Solaires
  } else if(item_4.defaultDamageType == 4){
    domageType_4 = Abyssaux
  } else if(item_4.defaultDamageType == 6){
    domageType_4 = Stase
  }

  let domageType_5 = "" as any
  
  if (item_5.defaultDamageType == 1){
    domageType_5 = Cinétiques
  } else if (item_5.defaultDamageType == 2){
    domageType_5 = Cryo_électriques
  } else if (item_5.defaultDamageType == 3){
    domageType_5 = Solaires
  } else if(item_5.defaultDamageType == 4){
    domageType_5 = Abyssaux
  } else if(item_5.defaultDamageType == 6){
    domageType_5 = Stase
  }

  let domageType_6 = "" as any
  
  if (item_6.defaultDamageType == 1){
    domageType_6 = Cinétiques
  } else if (item_6.defaultDamageType == 2){
    domageType_6 = Cryo_électriques
  } else if (item_6.defaultDamageType == 3){
    domageType_6 = Solaires
  } else if(item_6.defaultDamageType == 4){
    domageType_6 = Abyssaux
  } else if(item_6.defaultDamageType == 6){
    domageType_6 = Stase
  }

  let domageType_7 = "" as any
  
  if (item_7.defaultDamageType == 1){
    domageType_7 = Cinétiques
  } else if (item_7.defaultDamageType == 2){
    domageType_7 = Cryo_électriques
  } else if (item_7.defaultDamageType == 3){
    domageType_7 = Solaires
  } else if(item_7.defaultDamageType == 4){
    domageType_7 = Abyssaux
  } else if(item_7.defaultDamageType == 6){
    domageType_7 = Stase
  }

  let domageType_8 = "" as any
  
  if (item_8.defaultDamageType == 1){
    domageType_8 = Cinétiques
  } else if (item_8.defaultDamageType == 2){
    domageType_8 = Cryo_électriques
  } else if (item_8.defaultDamageType == 3){
    domageType_8 = Solaires
  } else if(item_8.defaultDamageType == 4){
    domageType_8 = Abyssaux
  } else if(item_8.defaultDamageType == 6){
    domageType_8 = Stase
  }

  let domageType_9 = "" as any
  
  if (item_9.defaultDamageType == 1){
    domageType_9 = Cinétiques
  } else if (item_9.defaultDamageType == 2){
    domageType_9 = Cryo_électriques
  } else if (item_9.defaultDamageType == 3){
    domageType_9 = Solaires
  } else if(item_9.defaultDamageType == 4){
    domageType_9 = Abyssaux
  } else if(item_9.defaultDamageType == 6){
    domageType_9 = Stase
  }

  let domageType_10 = "" as any
  
  if (item_10.defaultDamageType == 1){
    domageType_10 = Cinétiques
  } else if (item_10.defaultDamageType == 2){
    domageType_10 = Cryo_électriques
  } else if (item_10.defaultDamageType == 3){
    domageType_10 = Solaires
  } else if(item_10.defaultDamageType == 4){
    domageType_10 = Abyssaux
  } else if(item_10.defaultDamageType == 6){
    domageType_10 = Stase
  }

  let domageType_11 = "" as any
  
  if (item_11.defaultDamageType == 1){
    domageType_11 = Cinétiques
  } else if (item_11.defaultDamageType == 2){
    domageType_11 = Cryo_électriques
  } else if (item_11.defaultDamageType == 3){
    domageType_11 = Solaires
  } else if(item_11.defaultDamageType == 4){
    domageType_11 = Abyssaux
  } else if(item_11.defaultDamageType == 6){
    domageType_11 = Stase
  }

  let domageType_12 = "" as any
  
  if (item_12.defaultDamageType == 1){
    domageType_12 = Cinétiques
  } else if (item_12.defaultDamageType == 2){
    domageType_12 = Cryo_électriques
  } else if (item_12.defaultDamageType == 3){
    domageType_12 = Solaires
  } else if(item_12.defaultDamageType == 4){
    domageType_12 = Abyssaux
  } else if(item_12.defaultDamageType == 6){
    domageType_12 = Stase
  }

  let location = "" as any
  if(idItem.location[1] == 0){
    location = Tour
  } else if( idItem.location[1] == 1){
    location = ZME
  } else if(idItem.location[1] == 2){
    location = Nessos
  }

    const xurResponse = manifest.t(xurV)
    const manifests = xurResponse.displayProperties

    return {
      destination: location,
      vendeur: manifests,
      infoBrutes: xurResponse,
      display_Item_1: item_1, display_Item_2: item_2, display_Item_3: item_3, display_Item_4: item_4, display_Item_5: item_5, display_Item_6: item_6, 
      display_Item_7: item_7, display_Item_8: item_8, display_Item_9: item_9, display_Item_10: item_10, display_Item_11: item_11, display_Item_12: item_12, 
      
      
      armes_1: [{
        name: `${item_1.displayProperties.name}`, description: "\n\u200B"+`${item_1.itemTypeAndTierDisplayName}\u0020${domageType_1}\n\u200B`,
        fields_1: [{name:"Ressources :" ,value: `**Éclats légendaires** : \u0020 ${eclat_1}\u0020${eclat}`}],
      }],

      armes_2: [{
        name: `${item_2.displayProperties.name}`, description: `**Voir les stats de **: [${item_2.displayProperties.name}](https://www.light.gg/db/fr/items/${idItem.idItem[1]})\n\u200B`+" "+"\n\u200B"+`${item_2.itemTypeAndTierDisplayName}\u0020${domageType_2}\n\u200B`+" "+`\n\u200B${item_2.flavorText}\n\u200B`,
        fields_2: [{name:"Ressources :" ,value: `**Éclats légendaires** : \u0020 ${eclat_2}\u0020${eclat}`}]
      }],

      armes_3: [{
        name: `${item_3.displayProperties.name}`, description: `**Voir les stats de **: [${item_3.displayProperties.name}](https://www.light.gg/db/fr/items/${idItem.idItem[4]})\n\u200B`+" "+"\n\u200B"+`${item_3.itemTypeAndTierDisplayName}\u0020${domageType_3}\n\u200B`+" "+`\n\u200B${item_3.flavorText}\n\u200B`,
        fields_3: [{name:"Ressources :" ,value: `**Éclats légendaires** : \u0020 ${eclat_3}\u0020${eclat}`}]
      }],

      armes_4: [{
        name: `${item_4.displayProperties.name}`, description: `**Voir les stats de **: [${item_4.displayProperties.name}](https://www.light.gg/db/fr/items/${idItem.idItem[5]})\n\u200B`+" "+"\n\u200B"+`${item_4.itemTypeAndTierDisplayName}\u0020${domageType_4}\n\u200B`+" "+`\n\u200B${item_4.flavorText}\n\u200B`,
        fields_4: [{name:"Ressources :" ,value: `**Éclats légendaires** : \u0020 ${eclat_4}\u0020${eclat}`}]
      }],

      armes_5: [{
        name: `${item_5.displayProperties.name}`, description: `**Voir les stats de **: [${item_5.displayProperties.name}](https://www.light.gg/db/fr/items/${idItem.idItem[6]})\n\u200B`+" "+"\n\u200B"+`${item_5.itemTypeAndTierDisplayName}\u0020${domageType_5}\n\u200B`+" "+`\n\u200B${item_5.flavorText}\n\u200B`,
        fields_5: [{name:"Ressources :" ,value: `**Éclats légendaires** : \u0020 ${eclat_5}\u0020${eclat}`}]
      }],
      
      armes_6: [{
        name: `${item_6.displayProperties.name}`, description: `**Voir les stats de **: [${item_6.displayProperties.name}](https://www.light.gg/db/fr/items/${idItem.idItem[7]})\n\u200B`+" "+"\n\u200B"+`${item_6.itemTypeAndTierDisplayName}\u0020${domageType_6}\n\u200B`+" "+`\n\u200B${item_6.flavorText}\n\u200B`,
        fields_6: [{name:"Ressources :" ,value: `**Lumens** : \u0020 ${lumen_6}\u0020${lumen} \n **Éclats légendaires** : \u0020 ${eclat_6}\u0020${eclat}`}]

      }],

      armes_7: [{
        name: `${item_1.displayProperties.name}`, description: `**Voir les stats de **: [${item_1.displayProperties.name}](https://www.light.gg/db/fr/items/${idItem.idItem[8]})\n\u200B`+" "+"\n\u200B"+`${item_1.itemTypeAndTierDisplayName}\u0020${domageType_7}\n\u200B`+" "+`\n\u200B${item_7.flavorText}\n\u200B`,
        fields_7: [{name:"Ressources :" ,value: `**Lumens** : \u0020 ${lumen_7}\u0020${lumen} \n**Éclats légendaires** : \u0020 ${eclat_7}\u0020${eclat}`}],
      }],

      armes_8: [{
        name: `${item_2.displayProperties.name}`, description: `**Voir les stats de **: [${item_2.displayProperties.name}](https://www.light.gg/db/fr/items/${idItem.idItem[9]})\n\u200B`+" "+"\n\u200B"+`${item_2.itemTypeAndTierDisplayName}\u0020${domageType_8}\n\u200B`+" "+`\n\u200B${item_8.flavorText}\n\u200B`,
        fields_8: [{name:"Ressources :" ,value: `**Lumens** : \u0020 ${lumen_8}\u0020${lumen} \n **Éclats légendaires** : \u0020 ${eclat_8}\u0020${eclat}`}]
      }],

      armes_9: [{
        name: `${item_3.displayProperties.name}`, description: `**Voir les stats de **: [${item_3.displayProperties.name}](https://www.light.gg/db/fr/items/${idItem.idItem[10]})\n\u200B`+" "+"\n\u200B"+`${item_3.itemTypeAndTierDisplayName}\u0020${domageType_9}\n\u200B`+" "+`\n\u200B${item_9.flavorText}\n\u200B`,
        fields_9: [{name:"Ressources :" ,value: `**Lumens** : \u0020 ${lumen_9}\u0020${lumen} \n **Éclats légendaires** : \u0020 ${eclat_9}\u0020${eclat}`}]
      }],

      armes_10: [{
        name: `${item_4.displayProperties.name}`, description: `**Voir les stats de **: [${item_4.displayProperties.name}](https://www.light.gg/db/fr/items/${idItem.idItem[11]})\n\u200B`+" "+"\n\u200B"+`${item_4.itemTypeAndTierDisplayName}\u0020${domageType_10}\n\u200B`+" "+`\n\u200B${item_10.flavorText}\n\u200B`,
        fields_10: [{name:"Ressources :" ,value: `**Lumens** : \u0020 ${lumen_10}\u0020${lumen} \n **Éclats légendaires** : \u0020 ${eclat_10}\u0020${eclat}`}]
      }],

      armes_11: [{
        name: `${item_5.displayProperties.name}`, description: `**Voir les stats de **: [${item_5.displayProperties.name}](https://www.light.gg/db/fr/items/${idItem.idItem[12]})\n\u200B`+" "+"\n\u200B"+`${item_5.itemTypeAndTierDisplayName}\u0020${domageType_11}\n\u200B`+" "+`\n\u200B${item_11.flavorText}\n\u200B`,
        fields_11: [{name:"Ressources :" ,value: `**Lumens** : \u0020 ${lumen_11}\u0020${lumen} \n **Éclats légendaires** : \u0020 ${eclat_11}\u0020${eclat}`}]
      }],
      
      armes_12: [{
        name: `${item_6.displayProperties.name}`, description: `**Voir les stats de **: [${item_6.displayProperties.name}](https://www.light.gg/db/fr/items/${idItem.idItem[13]})\n\u200B`+" "+"\n\u200B"+`${item_6.itemTypeAndTierDisplayName}\u0020${domageType_12}\n\u200B`+" "+`\n\u200B${item_12.flavorText}\n\u200B`,
        fields_12: [{name:"Ressources :" ,value: `**Lumens** : \u0020 ${lumen_12}\u0020${lumen} \n **Éclats légendaires** : \u0020 ${eclat_12}\u0020${eclat}`}]

      }]
    }
  } catch (error) {
    console.log(error)
  }
}
export async function getIthemA() {
  const ada = await vendors()
  const vendorData =ada.Response.sales.data as any
  const saledata = Object.values(vendorData[ada_1V].saleItems)
  const idItem = saledata.map(({ itemHash }: any) => itemHash) as any
  
  return {idItem:idItem}
}

export async function getVendorDetailA() {
  try {
    
  const idItem = await getIthemA()

    const mod_1 = manifest.t(idItem.idItem[5])
    const mod_2 = manifest.t(idItem.idItem[6])
    const mod_3 = manifest.t(idItem.idItem[7])
    const mod_4 = manifest.t(idItem.idItem[8])

    const descriptionM_1 = manifest.t(mod_1.perks[0].perkHash)
    const descriptionM_2 = manifest.t(mod_2.perks[0].perkHash)
    const descriptionM_3 = manifest.t(mod_3.perks[0].perkHash)
    const descriptionM_4 = manifest.t(mod_4.perks[0].perkHash)

    const bansheeResponse = manifest.t(ada_1V)
    const manifests = bansheeResponse.displayProperties

    return {
      destination: Tour,
      vendeur: manifests,
      infoBrutes: bansheeResponse,
      mod_1 : mod_1, mod_2 : mod_2, mod_3 : mod_3, mod_4: mod_4,

      mods_1: [{
        name: `${mod_1.displayProperties.name}`, description: `${descriptionM_1.displayProperties.description}`,
        fields_M1: [{name:"Ressources :" ,value: `**Lumens** : \u0020 10 000\u0020${lumen}`}],
      }],

      mods_2: [{
        name: `${mod_2.displayProperties.name}`, description: `${descriptionM_2.displayProperties.description}`,
        fields_M2: [{name:"Ressources :" ,value: `**Lumens** : \u0020 10 000\u0020${lumen}`}],
      }],

      mods_3: [{
        name: `${mod_3.displayProperties.name}`, description: `${descriptionM_3.displayProperties.description}`,
        fields_M3: [{name:"Ressources :" ,value: `**Lumens** : \u0020 10 000\u0020${lumen}`}],
      }],

      mods_4: [{
        name: `${mod_4.displayProperties.name}`, description: `${descriptionM_4.displayProperties.description}`,
        fields_M4: [{name:"Ressources :" ,value: `**Lumens** : \u0020 10 000\u0020${lumen}`}],
      }],

    }
  } catch (error) {
    console.log(error)
  }
}

