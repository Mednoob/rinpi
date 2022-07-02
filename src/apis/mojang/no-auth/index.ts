import { extend } from "../../../utils/request";
import {
    ErrorResponse,
    PlayerIdentity,
    PlayerProfile,
    UsernameHistory
} from "./typings";

const request = extend("https://api.mojang.com");
const sessionRequest = extend("https://sessionserver.mojang.com");

class MojangAPIError extends Error {
    public constructor(err: ErrorResponse) {
        super(`MojangAPIError (${err.error}): ${"path" in err ? err.path : err.errorMessage}`);
    }
}

type UnPromise<T> = T extends Promise<infer U> ? U : T;
type ReqData = UnPromise<ReturnType<typeof request.get>>;

function json(data: ReqData): any {
    return JSON.parse(data.buffer.toString());
}

function handle<T = any>(res: ReqData): T {
    if (res.statusCode === 204) {
        throw new Error("Player not found");
    }

    const data: ErrorResponse | T = json(res);
    if ("error" in data) {
        throw new MojangAPIError(data);
    }

    return data;
}

/**
 * Retrieve list of servers IPs and domains blocked by Mojang.
 * @returns List of SHA1 hashes of servers IPs and domains blocked by Mojang. Separated by newlines.
 */
export async function blockedServers(): Promise<string> {
    return sessionRequest.get("/blockedservers").then(res => res.buffer.toString());
}

/** Retrieve UUID of a player using username */
export async function getUUID(username: string): Promise<PlayerIdentity>;
/** Retrieve UUID of multiple players using usernames array */
export async function getUUID(username: string[]): Promise<PlayerIdentity[]>;
export async function getUUID<T extends string[] | string = string>(
    username: T
): Promise<T extends string ? PlayerIdentity : PlayerIdentity[]> {
    const res = Array.isArray(username)
        ? await request.post("/profiles/minecraft", {
            body: username,
            headers: {
                "Content-Type": "application/json"
            }
        })
        : await request.get(`/users/profiles/minecraft/${username as unknown as string}`);

    return handle(res);
}

/** Retrieve username of a player using UUID */
export async function getUsername(uuid: string): Promise<PlayerIdentity> {
    const res = await request.get(`/user/profile/${uuid}`);

    return handle(res);
}

/** Retrieve player profile */
export async function profile<D extends boolean = false>(
    uuid: string,

    /** Whether the `properties` property in the profile should be decoded */
    decode?: D
): Promise<PlayerProfile<D>> {
    const res = await sessionRequest.get(`/session/minecraft/profile/${uuid}`);

    const data = handle<PlayerProfile>(res);
    if (decode) {
        data.properties = data.properties.map(p => JSON.parse(p.value));
    }

    return data as PlayerProfile<D>;
}

/** Retrieve username history of a player */
export async function usernameHistory(
    uuid: string
): Promise<[Omit<UsernameHistory, "changedToAt">, ...UsernameHistory[]]> {
    const res = await request.get(`/user/profiles/${uuid}/names`);

    return handle(res);
}
