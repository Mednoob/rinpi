import { request as http, IncomingHttpHeaders, RequestOptions } from "http";
import { request as https } from "https";

interface Response {
    readonly headers: IncomingHttpHeaders;
    readonly buffer: Buffer;
    readonly statusCode?: number;
    readonly requestUrl: string;
    readonly finalUrl: string;
}

type Options = RequestOptions & {
    body?: Record<string, unknown> | string;
    query?: Record<string, boolean | number | string>;
};

export function request(url: Rinpi.URLLike, options: Options = {}): Promise<Response> {
    const urlObj = typeof url === "string" ? new URL(url) : url;
    const protocol = urlObj.protocol === "https:" ? https : http;

    if (options.query) {
        for (const [key, value] of Object.entries(options.query)) {
            urlObj.searchParams
                .set(key, (typeof value === "boolean" ? Number(value) : value).toString());
        }
    }

    return new Promise((resolve, reject) => {
        let data = "";
        const req = protocol(urlObj, options, res => {
            res.on("data", chunk => data += chunk)
                .on("end", () => {
                    resolve({
                        headers: res.headers,
                        buffer: Buffer.from(data),
                        statusCode: res.statusCode,
                        requestUrl: urlObj.href,
                        finalUrl: res.headers.location ?? urlObj.href
                    });
                });
        });

        if (options.body) {
            req.write(JSON.stringify(options.body));
        }

        req.on("error", reject);
        req.end();
    });
}

type Method = "delete" | "get" | "patch" | "post" | "put";
type Extended = (path: string, options?: Options) => Promise<Response>;
type ExtendedModule = Record<Method, Extended>;

export const del: typeof request = (url, options = {}) => request(url, { ...options, method: "delete" });
export const get: typeof request = (url, options = {}) => request(url, { ...options, method: "get" });
export const patch: typeof request = (url, options = {}) => request(url, { ...options, method: "patch" });
export const post: typeof request = (url, options = {}) => request(url, { ...options, method: "post" });
export const put: typeof request = (url, options = {}) => request(url, { ...options, method: "put" });

export function extend(baseUrl: Rinpi.URLLike): ExtendedModule {
    const base = new URL(typeof baseUrl === "string" ? baseUrl : baseUrl.href);
    const func: Extended = (path, options = {}) => {
        const url = new URL(base.href);
        url.pathname = [...base.pathname.split("/"), ...path.split("/").filter(Boolean)].join("/");

        return request(url, options);
    };

    return {
        delete: (path, options) => func(path, { ...options, method: "delete" }),
        get: (path, options) => func(path, { ...options, method: "get" }),
        patch: (path, options) => func(path, { ...options, method: "patch" }),
        post: (path, options) => func(path, { ...options, method: "post" }),
        put: (path, options) => func(path, { ...options, method: "put" })
    };
}
