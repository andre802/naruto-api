// queryTypes.js
/**
 * Holds arrays containing values used in querying
 * the mongo database.
 */

/**
 * Affiliations: Akatsuki, Fire Temple,
 * Kara, etc
 */
const affiliations = [
    'Akatsuki', 'Allied Shinobi Forces',
    'Ame Orphans', 'Amegakure',
    'Fire Temple', 'Iwagakure',
    'Kabuto Yakushi', 'Kara',
    'Kirigakure', 'Konoha Orphanage',
    'Konohagakure', 'Kumogakure',
    'Kusagakure', 'Land of Ancestors',
    'Land of Earth', 'Land of Fire',
    'Land of Frost', 'Land of Hot Water',
    'Land of Iron', 'Land of Lightning',
    'Land of Valleys', 'Land of Water',
    'Land of Waves', 'Land of Wind',
    'Land of Woods', 'Land of the Moon',
    'Land of the Sea', 'Moon',
    'Mount Myōboku', 'Nara Clan',
    'Otogakure', 'Root',
    'Ryūchi Cave', 'Shikkotsu Forest',
    'Sunagakure', 'Takigakure',
    'Tsuchigumo Clan', 'Uzushiogakure',
    'Yugakure'
]
/**
 * Nature types: Boil Release, Fire Release,
 * Lighting Release, etc. Used for querying both
 * characters and jutsus.
 */
const natures = [
    'Boil Release',
    'Dust Release',
    'Earth Release',
    'Explosion Release',
    'Fire Release',
    'Ice Release',
    'Lava Release',
    'Lightning Release',
    'Magnet Release',
    'Scorch Release',
    'Storm Release',
    'Water Release',
    'Wind Release',
    'Wood Release',
    'Yang Release',
    'Yin Release',
    'Yin–Yang Release'
]
/**
 * Jutsu classifications: Barrier Ninjutsu,
 * Chakra Flow, Clone Techniques, etc.
 */
const jutsuClassifications = [
    'Barrier Ninjutsu',
    'Bukijutsu',
    'Chakra Absorption Techniques',
    'Chakra Flow',
    'Clone Techniques',
    'Collaboration Techniques',
    'Cooperation Ninjutsu',
    'Dōjutsu',
    'Fighting Style',
    'Fighting style',
    'Fūinjutsu',
    'General skill',
    'Genjutsu',
    'Hiden',
    'Juinjutsu',
    'Jujutsu',
    'Kekkei Genkai',
    'Kekkei Mōra',
    'Kekkei Tōta',
    'Kenjutsu',
    'Kinjutsu',
    'Kyūjutsu',
    'Medical Ninjutsu',
    'Ninjutsu',
    'Ninshū',
    'Nintaijutsu',
    'Regeneration Techniques',
    'Reincarnation Ninjutsu',
    'Senjutsu',
    'Shurikenjutsu',
    'Space–Time Ninjutsu',
    'Taijutsu'
]
/**
 * Character classifications: Medical-nin,
 * Missining-nin, Sage, etc.
 */
const characterClassifications = [
    'Daimyō',
    'Hunter-nin',
    'Jinchūriki',
    'Medical-nin',
    'Mercenary Ninja',
    'Missing-nin',
    'Ninja monk',
    'Pseudo-Jinchūriki',
    'S-rank',
    'Sage',
    'Samurai',
    'Sannin',
    'Sensor Type',
    'Summon',
    'Tailed Beast'
  ]
/**
 * Character ranks: Academy Student, Genin,
 * Kage, etc.
 */
const characterRanks = [
    'Academy Student',
    'Genin',
    'Chūnin',
    'Jōnin',
    'Tokubetsu Jōnin',
    'Anbu',
    'Kage',
    'Head Ninja'
]
/*
* Jutsu ranks, E through S Rank.
*/
const jutsuRanks = [
    'E-rank',
    'D-rank',
    'C-rank',
    'B-rank',
    'A-rank',
    'S-rank'
]
/**
 * Kekkei Genkais, such as Byakugan, Sharingan,
 * Boil Release, etc.
 */
const kekkeiGenkais = [
    'Boil Release',
    'Byakugan',
    'Eternal Mangekyō Sharingan',
    'Explosion Release',
    'Ice Release',
    "Isshiki's Dōjutsu",
    'Jōgan',
    "Jūgo's Clan's Kekkei Genkai",
    'Lava Release',
    'Magnet Release',
    'Mangekyō Sharingan',
    'Rinnegan',
    "Sakon and Ukon's Kekkei Genkai",
    'Scorch Release',
    'Sharingan',
    'Shikotsumyaku',
    'Storm Release',
    'Tenseigan',
    'Wood Release',
  ]

module.exports = {
    affiliations,
    natures,
    jutsuClassifications,
    characterClassifications,
    characterRanks,
    jutsuRanks,
    kekkeiGenkais
}