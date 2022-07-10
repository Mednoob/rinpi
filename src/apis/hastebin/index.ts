import { extend as reqExtend, request } from "../../utils/request.js";
import { STATUS_CODES } from "http";

interface HastebinModule {
    create: (text: string) => Promise<{ key: string; url: string }>;
    get: (id: string) => Promise<string>;
}
type UnPromise<T> = T extends Promise<infer U> ? U : T;
type ReqData = UnPromise<ReturnType<typeof request>>;

function handle(req: ReqData): ReqData {
    if (req.statusCode !== 200) {
        throw new Error(`Hastebin error: ${STATUS_CODES[req.statusCode ?? ""] ?? "Unknown"}`);
    }

    return req;
}

async function createHaste(req: ReturnType<typeof reqExtend>, text: string): Promise<{ key: string; url: string }> {
    const res = await req.post("/documents", {
        body: text,
        headers: {
            "Content-Type": "text/plain"
        }
    });

    const key = (JSON.parse(handle(res).buffer.toString()) as { key: string }).key;
    const url = new URL(res.requestUrl.slice(0, -10));
    url.pathname = url.pathname.split("/")
        .filter(Boolean)
        .concat(key)
        .join("/");

    return {
        key,
        url: url.toString()
    };
}

async function getHaste(req: ReturnType<typeof reqExtend>, id: string): Promise<string> {
    const res = await req.get(`/raw/${id}`);

    return handle(res).buffer.toString();
}

/** Create a hastebin API client using hastebin URL */
export function extend(url: URL | string): HastebinModule {
    const req = reqExtend(url);

    return {
        create: createHaste.bind(null, req),
        get: getHaste.bind(null, req)
    };
}

const haste = extend("https://bin.clytage.org");

export default haste;
export const create = haste.create;
export const get = haste.get;
