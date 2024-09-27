const { LogicDataType } = require('./LogicData.js')
const LogicDataTableResource = require('./LogicDataTableResource.js')
const LogicDataTables = require('./LogicDataTables.js')

class LogicResources {
    static createDataTableResourcesArray () {
        const DataTables = []

        DataTables.push(new LogicDataTableResource("csv_logic/locales.csv", LogicDataType.LOCALES, 0))
        DataTables.push(new LogicDataTableResource("csv_client/billing_packages.csv", LogicDataType.BILLING_PACKAGES, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/globals.csv", LogicDataType.GLOBALS, 0))
        DataTables.push(new LogicDataTableResource("csv_client/sounds.csv", LogicDataType.SOUNDS, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/resources.csv", LogicDataType.RESOURCES, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/projectiles.csv", LogicDataType.PROJECTILES, 0))
        DataTables.push(new LogicDataTableResource("csv_client/effects.csv", LogicDataType.EFFECTS, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/alliance_badges.csv", LogicDataType.ALLIANCE_BADGES, 0))
        DataTables.push(new LogicDataTableResource("csv_client/client_globals.csv", LogicDataType.CLIENT_GLOBALS, 0))
        DataTables.push(new LogicDataTableResource("csv_client/particle_emitters.csv", LogicDataType.PARTICLE_EMITTERS, 0))
        DataTables.push(new LogicDataTableResource("csv_client/health_bars.csv", LogicDataType.HEALTH_BARS, 0))
        DataTables.push(new LogicDataTableResource("csv_client/music.csv", LogicDataType.MUSIC, 0))
        DataTables.push(new LogicDataTableResource("csv_client/credits.csv", LogicDataType.CREDITS, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/regions.csv", LogicDataType.REGION, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/locations.csv", LogicDataType.LOCATIONS, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/characters.csv", LogicDataType.CHARACTERS, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/area_effects.csv", LogicDataType.AREA_EFFECTS, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/items.csv", LogicDataType.ITEMS, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/maps.csv", LogicDataType.MAPS, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/skills.csv", LogicDataType.SKILLS, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/campaign.csv", LogicDataType.CAMPAIGN, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/bosses.csv", LogicDataType.BOSSES, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/cards.csv", LogicDataType.CARDS, 0))
        DataTables.push(new LogicDataTableResource("csv_client/animations.csv", LogicDataType.ANIMATIONS, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/alliance_roles.csv", LogicDataType.ALLIANCE_ROLES, 0))
        DataTables.push(new LogicDataTableResource("csv_client/tutorial.csv", LogicDataType.TUTORIAL, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/tiles.csv", LogicDataType.TILES, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/player_thumbnails.csv", LogicDataType.PLAYER_THUMBNAILS, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/skins.csv", LogicDataType.SKINS, 0))
        DataTables.push(new LogicDataTableResource("csv_client/faces.csv", LogicDataType.FACES, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/pins.csv", LogicDataType.PINS, 0))
        DataTables.push(new LogicDataTableResource("csv_client/hints.csv", LogicDataType.HINTS, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/milestones.csv", LogicDataType.MILESTONES, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/messages.csv", LogicDataType.MESSAGES, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/themes.csv", LogicDataType.THEMES, 0))
        DataTables.push(new LogicDataTableResource("csv_client/links.csv", LogicDataType.LINKS, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/name_colors.csv", LogicDataType.NAME_COLORS, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/skin_confs.csv", LogicDataType.SKIN_CONFS, 0))
        DataTables.push(new LogicDataTableResource("csv_client/shop_items.csv", LogicDataType.SHOP_ITEMS, 0))
        DataTables.push(new LogicDataTableResource("csv_client/color_gradients.csv", LogicDataType.COLOR_GRADIENTS, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/location_themes.csv", LogicDataType.LOCATION_THEMES, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/game_mode_variations.csv", LogicDataType.GAME_MODE_VARIATIONS, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/challenges.csv", LogicDataType.CHALLENGES, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/accessories.csv", LogicDataType.ACCESSORIES, 0))
        DataTables.push(new LogicDataTableResource("csv_client/local_notifications.csv", LogicDataType.LOCAL_NOTIFICATIONS, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/emotes.csv", LogicDataType.EMOTES, 0))

        return DataTables
    }

    static load (resources, id, node) {
        const resource = resources[id]
        switch (resource.getTableType()) {
            case 0:
                LogicDataTables.initDataTables(node, resource.getTableIndex())
                break
            case 3:
                // StringTable
                break
            default:
                Err("LogicResources::Invalid resource type")
        }

        if (resources.length - 1 === id) {
            LogicDataTables.createReferences()
        }
    }
}

module.exports = LogicResources