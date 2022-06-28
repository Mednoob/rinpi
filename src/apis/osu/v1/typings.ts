import {
    ApprovalStatus,
    BeatmapGenre,
    BeatmapLanguage,
    Mode,
    MultiplayerMatchGameScoringType,
    MultiplayerMatchGameTeamType
} from "./enums.js";

interface APIKey {
    /** The API key. */
    k: string;
}

interface ModeOption {
    /** Beatmap mode. */
    m?: Mode;
}

export interface BeatmapFetchOptions extends APIKey, ModeOption {
    /** Return all beatmaps ranked or loved since this date. */
    since?: string;

    /** Beatmap set ID. */
    s?: string;

    /** Beatmap ID. */
    b?: string;

    /** User ID or username. */
    u?: string;

    /** Specify whether the `u` value is username or user ID. */
    type?: "id" | "string";

    /** Specify whether converted beatmaps are included. */
    a?: boolean;

    /** Beatmap hash. */
    h?: string;

    /** The amount of results. */
    limit?: number;

    /** Mods that applies to the beatmap requested. */
    mods?: string;
}

export interface Beatmap {
    approved: ApprovalStatus;
    submit_date: string;
    approved_date: string;
    last_update: string;
    artist: string;
    beatmap_id: string;
    beatmapset_id: string;
    bpm: string;
    creator: string;
    creator_id: string;
    difficultyrating: string;
    diff_aim: string;
    diff_speed: string;
    diff_size: string;
    diff_overall: string;
    diff_approach: string;
    diff_drain: string;
    hit_length: string;
    source: string;
    genre_id: BeatmapGenre;
    language_id: BeatmapLanguage;
    title: string;
    total_length: string;
    version: string;
    file_md5: string;
    mode: Mode;
    tags: string;
    favourite_count: string;
    rating: string;
    playcount: string;
    passcount: string;
    count_normal: string;
    count_slider: string;
    count_spinner: string;
    max_combo: string;
    storyboard: "0" | "1";
    video: "0" | "1";
    download_unavailable: "0" | "1";
    audio_unavailable: "0" | "1";
}

export interface UserEvent {
    display_html: string;
    beatmap_id: string;
    beatmapset_id: string;
    date: string;
    epicfactor: string;
}

export interface UserFetchOptions extends APIKey {
    /** User ID or username. */
    u: string;

    /** Specify whether the `u` value is username or user ID. */
    type?: "id" | "string";

    /** Max number of days between now and last event date. */
    event_days?: number;
}

export interface User {
    user_id: string;
    username: string;
    join_date: string;
    count300: string;
    count100: string;
    count50: string;
    playcount: string;
    ranked_score: string;
    total_score: string;
    pp_rank: string;
    level: string;
    pp_raw: string;
    accuracy: string;
    count_rank_ss: string;
    count_rank_ssh: string;
    count_rank_s: string;
    count_rank_sh: string;
    count_rank_a: string;
    country: string;
    total_seconds_played: string;
    pp_country_rank: string;
    events: UserEvent[];
}

export interface RecentScoreFetchOptions extends APIKey, ModeOption {
    /** User ID or username. */
    u: string;

    /** Mode used in the gameplay. */
    m?: Mode;

    /** Amount of results. */
    limit?: number;

    /** Specify whether the `u` value is username or user ID. */
    type?: "id" | "string";
}

export interface BeatmapScoreFetchOptions extends Omit<RecentScoreFetchOptions, "u"> {
    /** Beatmap ID. */
    b: string;

    /** User ID or username. */
    u?: string;

    /** Mods used. */
    mods?: string;
}

interface BaseScore {
    score: string;
    maxcombo: string;
    count50: string;
    count100: string;
    count300: string;
    countmiss: string;
    countkatu: string;
    countgeki: string;
    perfect: "0" | "1";
    enabled_mods: string;
    user_id: string;
    date: string;
    rank: string;
}

export interface BeatmapScore extends BaseScore {
    score_id: string;
    pp: string;
    replay_available: "0" | "1";
    username: string;
}

export interface RecentScore extends BaseScore {
    beatmap_id: string;
}

export interface TopUserScore extends RecentScore {
    beatmap_id: string;
    pp: string;
    score_id: string;
    replay_available: "0" | "1";
}

interface MultiplayerMatchInfo {
    match_id: string;
    name: string;
    start_time: string;
    end_time: string | null;
}

interface MultiplayerMatchGameScore {
    slot: string;
    team: "0" | "1" | "2";
    user_id: string;
    score: string;
    maxcombo: string;
    rank: string;
    count50: string;
    count100: string;
    count300: string;
    countmiss: string;
    countkatu: string;
    countgeki: string;
    perfect: "0" | "1";
    pass: "0" | "1";
    enabled_mods: string | null;
}

interface MultiplayerMatchGame {
    game_id: string;
    start_time: string;
    end_time: string;
    beatmap_id: string;
    play_mode: Mode;
    match_type: string;
    scoring_type: MultiplayerMatchGameScoringType;
    team_type: MultiplayerMatchGameTeamType;
    mods: string;
    scores: MultiplayerMatchGameScore[];
}

export interface MultiplayerMatch {
    match: MultiplayerMatchInfo;
    games: MultiplayerMatchGame[];
}

export interface MultiplayerMatchFetchOptions extends APIKey {
    /**
     * Match ID.
     */
    mp: string;
}

export interface ReplayFetchOptions extends APIKey, ModeOption {
    /** Beatmap ID. */
    b: string;

    /** User ID. */
    u: string;

    /** Score ID. May be passed instead of `b` and `u`. */
    s?: string;

    /** Specify whether the `u` value is username or user ID. */
    type?: "id" | "string";

    /** Mods used. */
    mods?: string;
}

export interface Replay {
    content: string;
    encoding: "base64";
}
