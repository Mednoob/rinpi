import { extend } from "../../utils/request.js";
import {
    JSONMD5Options,
    JSONSearchOptions,
    MD5Options,
    Options,
    Post,
    Result,
    SearchOptions,
    XMLSearchOptions
} from "./typings";
import { STATUS_CODES } from "http";

const request = extend("https://danbooru.donmai.us/");

export async function searchPost<T extends MD5Options>(options: T): Promise<T extends JSONMD5Options ? Post : string>;
export async function searchPost<T extends SearchOptions = JSONSearchOptions>(options?: T): Promise<T extends XMLSearchOptions ? string : Post[]>;
export async function searchPost<T extends Options>(
    options: T = {
        format: "json"
    } as T
): Promise<Result<T>> {
    const query = {
        ...options
    };
    if ("random" in query && query.random) {
        query.tags = `${query.tags ?? ""} random:20`;
        delete query.random;
    }

    const data = await request.get(`/posts.${options.format ?? "json"}`, {
        query: query as any
    });

    if (data.statusCode! !== 200) {
        throw new Error(`Danbooru error: ${STATUS_CODES[data.statusCode ?? ""] ?? "Unknown"}`);
    }

    return (options.format ?? "json") === "json" ? JSON.parse(data.buffer.toString()) : data.buffer.toString();
}
