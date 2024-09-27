const LogicData = require('../LogicData')

class LogicLocaleData extends LogicData {
    name = null
    iconSWF = null
    iconExportName = null
    localizedName = null
    sortOrder = null
    enabled = null
    enabledCN = null
    fileName = null
    testLanguage = null
    usedSystemFont = null
    preferedFallbackFont = null
    forcedFontFullName = null
    helpshiftSDKLanguage = null
    helpshiftSDKLanguageAndroid = null
    testExcludes = []
    loadAllLanguages = null
    championshipRegisterUrl = null
    championshipRegisterUrl_cn = null
    termsAndServiceUrl = null
    parentsGuideUrl = null
    privacyPolicyUrl = null
    laserboxUrl = null
    laserboxUrlCN = null
    laserboxStagingUrl = null
    laserboxStagingUrlCN = null
    laserboxCommunityUrl = null
    laserboxCommunityUrlCN = null
    laserboxCommunityStagingUrl = null
    laserboxCommunityStagingUrlCN = null
    laserboxLangCode = null
    faqUrl_ios = null
    faqUrl_ios_cn = null
    faqUrl_android = null
    faqUrl_android_cn = null
    contactUsUrl_ios = null
    contactUsUrl_ios_cn = null
    contactUsUrl_android = null
    contactUsUrl_android_cn = null
    laserboxEnabled = null
    isRTL = null
    isNounAdj = null
    separateThousandsWithSpaces = null
    selfHelpUrl = null
    selfHelpUrlCN = null
    fallbackToHelpshift = null
    fallbackToHelpshiftCN = null
    termsAndServiceUrl_Tencent_android = null
    parentsGuideUrl_Tencent_android = null
    privacyPolicyUrl_Tencent_android = null
    termsAndServiceUrl_Tencent_ios = null
    parentsGuideUrl_Tencent_ios = null
    privacyPolicyUrl_Tencent_ios = null
    termsAndServiceUrl_Yoozoo = null
    parentsGuideUrl_Yoozoo = null
    privacyPolicyUrl_Yoozoo = null
    deviceMigrationSelfHelpUrl = null


    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.iconSWF = this.getStringValue("IconSWF")
        this.iconExportName = this.getStringValue("IconExportName")
        this.localizedName = this.getStringValue("LocalizedName")
        this.sortOrder = this.getIntValue("SortOrder")
        this.enabled = this.getBoolValue("Enabled")
        this.enabledCN = this.getBoolValue("EnabledCN")
        this.fileName = this.getStringValue("FileName")
        this.testLanguage = this.getBoolValue("TestLanguage")
        this.usedSystemFont = this.getStringValue("UsedSystemFont")
        this.preferedFallbackFont = this.getStringValue("PreferedFallbackFont")
        this.forcedFontFullName = this.getStringValue("ForcedFontFullName")
        this.helpshiftSDKLanguage = this.getStringValue("HelpshiftSDKLanguage")
        this.helpshiftSDKLanguageAndroid = this.getStringValue("HelpshiftSDKLanguageAndroid")
        
        const testExcludesArraySize = this.row.getBiggestArraySize() 

        for (let i = 0; i < testExcludesArraySize; i++) {
            this.testExcludes.push(this.getStringArrayValue("TestExcludes", i))
        }

        this.loadAllLanguages = this.getBoolValue("LoadAllLanguages")
        this.championshipRegisterUrl = this.getStringValue("ChampionshipRegisterUrl")
        this.championshipRegisterUrl_cn = this.getStringValue("ChampionshipRegisterUrl_cn")
        this.termsAndServiceUrl = this.getStringValue("TermsAndServiceUrl")
        this.parentsGuideUrl = this.getStringValue("ParentsGuideUrl")
        this.privacyPolicyUrl = this.getStringValue("PrivacyPolicyUrl")
        this.laserboxUrl = this.getStringValue("LaserboxUrl")
        this.laserboxUrlCN = this.getStringValue("LaserboxUrlCN")
        this.laserboxStagingUrl = this.getStringValue("LaserboxStagingUrl")
        this.laserboxStagingUrlCN = this.getStringValue("LaserboxStagingUrlCN")
        this.laserboxCommunityUrl = this.getStringValue("LaserboxCommunityUrl")
        this.laserboxCommunityUrlCN = this.getStringValue("LaserboxCommunityUrlCN")
        this.laserboxCommunityStagingUrl = this.getStringValue("LaserboxCommunityStagingUrl")
        this.laserboxCommunityStagingUrlCN = this.getStringValue("LaserboxCommunityStagingUrlCN")
        this.laserboxLangCode = this.getStringValue("LaserboxLangCode")
        this.faqUrl_ios = this.getStringValue("FaqUrl_ios")
        this.faqUrl_ios_cn = this.getStringValue("FaqUrl_ios_cn")
        this.faqUrl_android = this.getStringValue("FaqUrl_android")
        this.faqUrl_android_cn = this.getStringValue("FaqUrl_android_cn")
        this.contactUsUrl_ios = this.getStringValue("ContactUsUrl_ios")
        this.contactUsUrl_ios_cn = this.getStringValue("ContactUsUrl_ios_cn")
        this.contactUsUrl_android = this.getStringValue("ContactUsUrl_android")
        this.contactUsUrl_android_cn = this.getStringValue("ContactUsUrl_android_cn")
        this.laserboxEnabled = this.getBoolValue("LaserboxEnabled")
        this.isRTL = this.getBoolValue("IsRTL")
        this.isNounAdj = this.getBoolValue("isNounAdj")
        this.separateThousandsWithSpaces = this.getBoolValue("SeparateThousandsWithSpaces")
        this.selfHelpUrl = this.getStringValue("SelfHelpUrl")
        this.selfHelpUrlCN = this.getStringValue("SelfHelpUrlCN")
        this.fallbackToHelpshift = this.getBoolValue("FallbackToHelpshift")
        this.fallbackToHelpshiftCN = this.getBoolValue("FallbackToHelpshiftCN")
        this.termsAndServiceUrl_Tencent_android = this.getStringValue("TermsAndServiceUrl_Tencent_android")
        this.parentsGuideUrl_Tencent_android = this.getStringValue("ParentsGuideUrl_Tencent_android")
        this.privacyPolicyUrl_Tencent_android = this.getStringValue("PrivacyPolicyUrl_Tencent_android")
        this.termsAndServiceUrl_Tencent_ios = this.getStringValue("TermsAndServiceUrl_Tencent_ios")
        this.parentsGuideUrl_Tencent_ios = this.getStringValue("ParentsGuideUrl_Tencent_ios")
        this.privacyPolicyUrl_Tencent_ios = this.getStringValue("PrivacyPolicyUrl_Tencent_ios")
        this.termsAndServiceUrl_Yoozoo = this.getStringValue("TermsAndServiceUrl_Yoozoo")
        this.parentsGuideUrl_Yoozoo = this.getStringValue("ParentsGuideUrl_Yoozoo")
        this.privacyPolicyUrl_Yoozoo = this.getStringValue("PrivacyPolicyUrl_Yoozoo")
        this.deviceMigrationSelfHelpUrl = this.getStringValue("DeviceMigrationSelfHelpUrl")
    }

    getStringValue (name) {
        return this.getValue(name, 0)
    }

    getIntValue (name) {
        return this.getIntegerValue(name, 0)
    }

    getBoolValue (name) {
        return this.getBooleanValue(name, 0)
    }

    getStringArrayValue (name, index) {
        return this.getValue(name, index)
    }
}

module.exports = LogicLocaleData