const LogicData = require('./LogicData')
const GlobalID = require('../../Titan/GlobalID')

const LogicLocaleData = require('./TablesData/LogicLocaleData')
const LogicBillingPackagesData = require('./TablesData/LogicBillingPackagesData')
const LogicGlobalData = require('./TablesData/LogicGlobalData')
const LogicSoundData = require('./TablesData/LogicSoundData')
const LogicResourceData = require('./TablesData/LogicResourceData')
const LogicProjectileData = require('./TablesData/LogicProjectileData')
const LogicEffectData = require('./TablesData/LogicEffectData')
const LogicAllianceBadgeData = require('./TablesData/LogicAllianceBadgeData')
const LogicParticleEmitterData = require('./TablesData/LogicParticleEmitterData')
const LogicHealthBarData = require('./TablesData/LogicHealthBarData')
const LogicMusicData = require('./TablesData/LogicMusicData')
const LogicRegionData = require('./TablesData/LogicRegionData')
const LogicCharacterData = require('./TablesData/LogicCharacterData')
const LogicLocationData = require('./TablesData/LogicLocationData')
const LogicAreaEffectData = require('./TablesData/LogicAreaEffectData')
const LogicItemData = require('./TablesData/LogicItemData')
const LogicSkillData = require('./TablesData/LogicSkillData')
const LogicCampaignData = require('./TablesData/LogicCampaignData')
const LogicBossData = require('./TablesData/LogicBossData')
const LogicCardData = require('./TablesData/LogicCardData')
const LogicAnimationData = require('./TablesData/LogicAnimationData')
const LogicAllianceRoleData = require('./TablesData/LogicAllianceRoleData')
const LogicTutorialStepData = require('./TablesData/LogicTutorialStepData')
const LogicTileData = require('./TablesData/LogicTileData')
const LogicPlayerThumbnailData = require('./TablesData/LogicPlayerThumbnailData')
const LogicSkinData = require('./TablesData/LogicSkinData')
const LogicFaceData = require('./TablesData/LogicFaceData')
const LogicHintData = require('./TablesData/LogicHintData')
const LogicMilestone = require('./TablesData/LogicMilestone')
const LogicPinData = require('./TablesData/LogicPinData')
const LogicMessageData = require('./TablesData/LogicMessageData')
const LogicThemeData = require('./TablesData/LogicThemeData')
const LogicLinkData = require('./TablesData/LogicLinkData')
const LogicNameColorData = require('./TablesData/LogicNameColorData')
const LogicSkinConfData = require('./TablesData/LogicSkinConfData')
const LogicShopItemData = require('./TablesData/LogicShopItemData')
const LogicColorGradientData = require('./TablesData/LogicColorGradientData')
const LogicLocationThemeData = require('./TablesData/LogicLocationThemeData')
const LogicGameModeVariationData = require('./TablesData/LogicGameModeVariationData')
const LogicChallengeData = require('./TablesData/LogicChallengeData')
const LogicAccessoryData = require('./TablesData/LogicAccessoryData')
const LogicLocalNotificationData = require('./TablesData/LogicLocalNotificationData')
const LogicEmoteData = require('./TablesData/LogicEmoteData')

const LogicDataType = LogicData.LogicDataType

class LogicDataTable {
    tableIndex = 0
    tableName = ""
    loaded = false
    loaded2 = false

    table = null;
    items = []

    constructor (table, index) {
        this.tableIndex = index
        this.table = table
        this.items = []

        this.loadTable()
    }

    loadTable () {
        for (let i = 0; i < this.table.getRowCount(); i++) {
            this.addItem(this.table.getRowAt(i))
        }
    }

    setTable (table) {
        this.table = table

        for (let i = 0; i < this.items.length; i++) {
            this.items[i].setCSVRow(table.getRowAt(i))
        }
    }

    addItem (row) { 
        this.items.push(this.createItem(row))
    }

    createItem (row) {
        let data = null

        switch (this.tableIndex) {
            case LogicDataType.LOCALES: 
                data = new LogicLocaleData(row, this)
                break

            case LogicDataType.BILLING_PACKAGES: 
                data = new LogicBillingPackagesData(row, this)
                break

            case LogicDataType.GLOBALS: 
            case LogicDataType.CLIENT_GLOBALS:
                data = new LogicGlobalData(row, this)
                break;

            case LogicDataType.SOUNDS:
                data = new LogicSoundData(row, this)
                break;

            case LogicDataType.RESOURCES:
                data = new LogicResourceData(row, this)
                break;

            case LogicDataType.PROJECTILES:
                data = new LogicProjectileData(row, this)
                break;

            case LogicDataType.EFFECTS:
                data = new LogicEffectData(row, this)
                break;

            case LogicDataType.ALLIANCE_BADGES:
                data = new LogicAllianceBadgeData(row, this)
                break;

            case LogicDataType.PARTICLE_EMITTERS:
                data = new LogicParticleEmitterData(row, this)
                break;

            case LogicDataType.HEALTH_BARS:
                data = new LogicHealthBarData(row, this)
                break;

            case LogicDataType.MUSIC:
                data = new LogicMusicData(row, this)
                break;

            case LogicDataType.CREDITS:
            case LogicDataType.MAPS:
                data = new LogicData(row, this)
                break;

            case LogicDataType.REGION:
                data = new LogicRegionData(row, this)
                break;

            case LogicDataType.LOCATIONS:
                data = new LogicLocationData(row, this)
                break;

            case LogicDataType.CHARACTERS:
                data = new LogicCharacterData(row, this)
                break;

            case LogicDataType.AREA_EFFECTS:
                data = new LogicAreaEffectData(row, this)
                break;

            case LogicDataType.ITEMS:
                data = new LogicItemData(row, this)
                break;

            case LogicDataType.SKILLS:
                data = new LogicSkillData(row, this)
                break;

            case LogicDataType.CAMPAIGN:
                data = new LogicCampaignData(row, this)
                break;

            case LogicDataType.BOSSES:
                data = new LogicBossData(row, this)
                break;

            case LogicDataType.CARDS:
                data = new LogicCardData(row, this)
                break;

            case LogicDataType.ANIMATIONS:
                data = new LogicAnimationData(row, this)
                break;

            case LogicDataType.ALLIANCE_ROLES:
                data = new LogicAllianceRoleData(row, this)
                break;

            case LogicDataType.TUTORIAL:
                data = new LogicTutorialStepData(row, this)
                break;

            case LogicDataType.TILES:
                data = new LogicTileData(row, this)
                break;

            case LogicDataType.PLAYER_THUMBNAILS:
                data = new LogicPlayerThumbnailData(row, this)
                break;

            case LogicDataType.SKINS:
                data = new LogicSkinData(row, this)
                break;

            case LogicDataType.FACES:
                data = new LogicFaceData(row, this)
                break;

            case LogicDataType.PINS:
                data = new LogicPinData(row, this)
                break;

            case LogicDataType.HINTS:
                data = new LogicHintData(row, this)
                break;

            case LogicDataType.MILESTONES:
                data = new LogicMilestone(row, this)
                break;

            case LogicDataType.MESSAGES:
                data = new LogicMessageData(row, this)
                break;

            case LogicDataType.THEMES:
                data = new LogicThemeData(row, this)
                break;

            case LogicDataType.LINKS:
                data = new LogicLinkData(row, this)
                break;

            case LogicDataType.NAME_COLORS:
                data = new LogicNameColorData(row, this)
                break;

            case LogicDataType.SKIN_CONFS:
                data = new LogicSkinConfData(row, this)
                break;

            case LogicDataType.SHOP_ITEMS:
                data = new LogicShopItemData(row, this)
                break;

            case LogicDataType.COLOR_GRADIENTS:
                data = new LogicColorGradientData(row, this)
                break;

            case LogicDataType.LOCATION_THEMES:
                data = new LogicLocationThemeData(row, this)
                break;

            case LogicDataType.GAME_MODE_VARIATIONS:
                data = new LogicGameModeVariationData(row, this)
                break;

            case LogicDataType.CHALLENGES:
                data = new LogicChallengeData(row, this)
                break;

            case LogicDataType.ACCESSORIES:
                data = new LogicAccessoryData(row, this)
                break;

            case LogicDataType.LOCAL_NOTIFICATIONS:
                data = new LogicLocalNotificationData(row, this)
                break;

            case LogicDataType.EMOTES:
                data = new LogicEmoteData(row, this)
                break;

            default:
                Err("Invalid data table index: " + this.tableIndex)
        }

        return data
    }

    createReferences () {
        if (!this.loaded) {
            for (let i = 0; i < this.items.length; i++) {
                if (!this.items[i]) {
                    Err(`LogicDataTable::createReferences() - Item at table (${this.tableIndex}) is null! Row: ${i}`)
                    continue
                }
                this.items[i].createReferences()
            }

            this.loaded = true
        }
    }

    createReferences2 () {
        if (!this.loaded2) {
            for (let i = 0; i < this.items.length; i++) {
                if (!this.items[i]) {
                    continue
                }
                this.items[i].createReferences2()
            }

            this.loaded2 = true
        }
    }

    getItemAt (index) {
        return this.items[index]
    }

    getDataByName (name) {
        if (name !== null && name.length > 0) {
            for (let i = 0; i < this.items.length; i++) {
                const data = this.items[i]

                if (data.getName() === name) {
                    return data
                }
            }

            Warn(`CSV row has an invalid name: ${name}`)
        }

        return null;
    }

    getItemById (globalId) {
        const instanceId = GlobalID.getInstanceID(globalId)

        if (instanceId < 0 || instanceId >= this.items.length) {
            Warn(`LogicDataTable::getItemById() - Instance id out of bounds! ${instanceId + 1} / ${this.items.length}`)
            return null;
        }

        return this.items[instanceId]
    }

    getItemCount () {
        return this.items.length
    }

    getTableIndex () {
        return this.tableIndex
    }

    getTableName () {
        return this.tableName
    }

    setName (name) {
        this.tableName = name
    }
}

module.exports = LogicDataTable