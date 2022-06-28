import { simple } from "../../../utils/request/index.js";
import {
    Beatmap,
    BeatmapFetchOptions,
    BeatmapScore,
    BeatmapScoreFetchOptions,
    MultiplayerMatch,
    MultiplayerMatchFetchOptions,
    RecentScore,
    RecentScoreFetchOptions,
    Replay,
    ReplayFetchOptions,
    TopUserScore,
    User,
    UserFetchOptions
} from "./typings";

const request = simple.create("https://osu.ppy.sh/api");

function fetch(...args: Parameters<typeof request>): Promise<any> {
    return request(...args).then(res => JSON.parse(res.buffer.toString()));
}

export const beatmaps = (options: BeatmapFetchOptions): Promise<Beatmap[]> => fetch("/get_beatmaps", options as Record<string, any>);
export const users = (options: UserFetchOptions): Promise<User[]> => fetch("/get_user", options as Record<string, any>);
export const scores = (options: BeatmapScoreFetchOptions): Promise<BeatmapScore[]> => fetch("/get_scores", options as Record<string, any>);
export const replay = (options: ReplayFetchOptions): Promise<Replay> => fetch("/get_replay", options as Record<string, any>);
export const recents = (options: RecentScoreFetchOptions): Promise<RecentScore[]> => fetch("/get_user_recent", options as Record<string, any>);

export const tops = (options: RecentScoreFetchOptions): Promise<TopUserScore[]> => fetch("/get_user_best", options as Record<string, any>);
export const bests = tops;

export const match = (options: MultiplayerMatchFetchOptions): Promise<MultiplayerMatch> => fetch("/get_match", options as Record<string, any>);
export const multiplayer = match;
