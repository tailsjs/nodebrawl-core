const GlobalID = require('../../Titan/GlobalID')

class LogicData {
    globalId = 0

    tidIndex = -1
    infoTidIndex = -1
    iconExportNameIndex = -1
    iconSWFIndex = -1

    row = null
    table = null

    constructor (row, table) {
        this.row = row
        this.table = table

        this.globalId = GlobalID.composeGlobalID(table.getTableIndex(), table.getItemCount())
    }

    createReferences () { 
        this.iconSWFIndex = this.row.getColumnIndexByName("IconSWF")
        this.iconExportNameIndex = this.row.getColumnIndexByName("IconExportName")
        this.infoTidIndex = this.row.getColumnIndexByName("InfoTID")
        this.tidIndex = this.row.getColumnIndexByName("TID")
    }

    createReferences2 () { }

    setCSVRow (row) {
        this.row = row
    }

    getArraySize (column) {
        return this.row.getArraySize(column)
    }

    getDataType () {
        return this.table.getTableIndex()
    }

    getGlobalId () {
        return this.globalId
    }

    getInstanceId () {
        return GlobalID.getInstanceID(this.globalId)
    }

    getColumnIndex (name) {
        const columnIndex = this.row.getColumnIndexByName(name)

        if (columnIndex === -1) {
            Warn(`Unable to find column ${name} from ${this.getDebuggerName()}`)
        }

        return columnIndex
    }

    getDebuggerName () {
        return `${this.row.getName()} (${this.table.getTableName()})`
    }

    getBooleanValue (columnName, index) {
        return this.row.getBooleanValue(columnName, index)
    }

    getClampedBooleanValue (columnName, index) {
        return this.row.getClampedBooleanValue(columnName, index)
    }

    getIntegerValue (columnName, index) {
        return this.row.getIntegerValue(columnName, index)
    }

    getClampedIntegerValue (columnName, index) {
        return this.row.getClampedIntegerValue(columnName, index)
    }

    getValue (columnName, index) {
        return this.row.getValue(columnName, index)
    }

    getClampedValue (columnName, index) {
        return this.row.getClampedValue(columnName, index)
    }

    getName () {
        return this.row.getName()
    }

    getTID () {
        if (this.tidIndex !== -1) {
            return this.row.getValueAt(this.tidIndex, 0)
        }

        return null
    }

    getInfoTID () {
        if (this.infoTidIndex !== -1) {
            return this.row.getValueAt(this.infoTidIndex, 0)
        }

        return null
    }

    getIconExportName () {
        if (this.iconExportNameIndex !== -1) {
            return this.row.getValueAt(this.iconExportNameIndex, 0)
        }

        return null
    }

    static LogicDataType = {
        LOCALES: 1,
        BILLING_PACKAGES: 2,
        GLOBALS: 3,
        SOUNDS: 4,
        RESOURCES: 5,
        PROJECTILES: 6,
        EFFECTS: 7,
        ALLIANCE_BADGES: 8,
        CLIENT_GLOBALS: 9,
        PARTICLE_EMITTERS: 10,
        HEALTH_BARS: 11,
        MUSIC: 12,
        CREDITS: 13,
        REGION: 14,
        LOCATIONS: 15,
        CHARACTERS: 16,
        AREA_EFFECTS: 17,
        ITEMS: 18,
        MAPS: 19,
        SKILLS: 20,
        CAMPAIGN: 21,
        BOSSES: 22,
        CARDS: 23,
        ANIMATIONS: 24,
        ALLIANCE_ROLES: 25,
        TUTORIAL: 26,
        TILES: 27,
        PLAYER_THUMBNAILS: 28,
        SKINS: 29,
        FACES: 30,
        PINS: 35,
        HINTS: 36,
        MILESTONES: 39,
        MESSAGES: 40,
        THEMES: 41,
        LINKS: 42,
        NAME_COLORS: 43,
        SKIN_CONFS: 44,
        SHOP_ITEMS: 45,
        COLOR_GRADIENTS: 46,
        LOCATION_THEMES: 47,
        GAME_MODE_VARIATIONS: 48,
        CHALLENGES: 49,
        ACCESSORIES: 50,
        LOCAL_NOTIFICATIONS: 51,
        EMOTES: 52,
        EMOTE_BUNDLES: 53,
        PLAYER_MAP_ENVIRONMENTS: 54,
        MAP_TEMPLATES: 55,
        SEASONAL_SKIN_SECTIONS: 56,
        SKIN_CAMPAIGNS: 57,
        RANKED_RANKS: 58,
        RANKED_LOCATIONS: 59,
        CARRYABLES: 60,
        GEAR_LEVELS: 61,
        GEAR_BOOSTS: 62,
        ALLIANCE_LEAGUE_MODES: 63,
        ALLIANCE_LEAGUE_RANKS: 64,
        BP_PURCHASE_POPUP: 65,
        LOCATION_FEATURES: 66,
        LOGIN_CALENDAR_ITEMS: 67,
        SPRAYS: 68,
        SHOP_PANEL_LAYOUTS: 69,
        GEAR_RARITIES: 71,
        SHOP_STYLE_SETS: 70,
        FAME_TIERS: 72,
        MASTERY_LEVELS: 73,
        MASTERY_HERO_CONFS: 74,
        MASTERY_POINTS: 75,
        PLAYER_TITLES: 76,
        CATALOG_COLLECTIONS: 77,
        BATTLE_FEATS: 78,
        RANDOM_REWARDS: 79,
        RANDOM_REWARD_CONTAINERS: 80,
        CLUB_PIGGY_WINS: 81,
        CLUB_PIGGY_LEVELS: 82,
        ENUMERATED_ID_LISTS: 83,
        AD_PLACEMENTS: 84,
        PLAYER_FRAMES: 85,
        SKIN_RARITIES: 86,
        STATUS_EFFECTS: 87,
        RANKED_STAR_REWARDS: 88,
        COLLABS: 89,
        CLASS_ARCHETYPES: 90,
        NIGHT_MARKET_BUNDLES: 91,
        NIGHT_MARKET_ITEMS: 92,
        EVENT_SLOTS: 93 
    }
}

module.exports = LogicData