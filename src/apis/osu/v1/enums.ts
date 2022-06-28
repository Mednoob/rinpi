export enum Mode {
    STD = "0",
    TAIKO = "1",
    CTB = "2",
    MANIA = "3"
}

export enum ApprovalStatus {
    GRAVEYARD = "-2",
    WIP = "-1",
    PENDING = "0",
    RANKED = "1",
    APPROVED = "2",
    QUALIFIED = "3",
    LOVED = "4"
}

export enum BeatmapGenre {
    ANY = "0",
    UNSPECIFIED = "1",
    VIDEO_GAME = "2",
    ANIME = "3",
    ROCK = "4",
    POP = "5",
    OTHER = "6",
    NOVELTY = "7",
    HIP_HOP = "9",
    ELECTRONIC = "10",
    METAL = "11",
    CLASSICAL = "12",
    FOLK = "13",
    JAZZ = "14"
}

export enum BeatmapLanguage {
    ANY = "0",
    UNSPECIFIED = "1",
    ENGLISH = "2",
    JAPANESE = "3",
    CHINESE = "4",
    INSTRUMENTAL = "5",
    KOREAN = "6",
    FRENCH = "7",
    GERMAN = "8",
    SWEDISH = "9",
    SPANISH = "10",
    ITALIAN = "11",
    RUSSIAN = "12",
    POLISH = "13",
    OTHER = "14"
}

export enum MultiplayerMatchGameScoringType {
    SCORE = "0",
    ACCURACY = "1",
    COMBO = "2",
    "SCORE_V2" = "3"
}

export enum MultiplayerMatchGameTeamType {
    HEAD_TO_HEAD = "0",
    TAG_COOP = "1",
    TEAM_VS = "2",
    TAG_TEAM_VS = "3"
}
