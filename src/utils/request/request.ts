import { request as http, IncomingHttpHeaders, RequestOptions } from "http";
import { request as https } from "https";

interface RequestData {
    readonly headers: IncomingHttpHeaders;
    readonly buffer: Buffer;
    readonly statusCode?: number;
    readonly requestUrl: string;
    readonly finalUrl: string;
}

type Body = Record<string, unknown> | string;

function request(url: Rinpi.URLLike, options: RequestOptions = {}, body?: Body): Promise<RequestData> {
    const urlObj = typeof url === "string" ? new URL(url) : url;
    const protocol = urlObj.protocol === "https:" ? https : http;

    return new Promise((resolve, reject) => {
        let data = "";
        const req = protocol(urlObj, options, res => {
            res.on("data", chunk => {
                data += chunk;
            });
            res.on("end", () => {
                resolve({
                    headers: res.headers,
                    buffer: Buffer.from(data),
                    statusCode: res.statusCode,
                    requestUrl: urlObj.href,
                    finalUrl: res.headers.location ?? urlObj.href
                });
            });
        });

        if (body) {
            req.write(body);
        }

        req.on("error", reject);
        req.end();
    });
}

type RF = (url: Rinpi.URLLike, options?: RequestOptions) => Promise<RequestData>;
type RFWB = (url: Rinpi.URLLike, body: Body, options?: RequestOptions) => Promise<RequestData>;

interface RequestModule {
    request: typeof request;
    get: RF;
    post: RFWB;
    put: RFWB;
    delete: RF;
    patch: RFWB;
}

function createModule(): RequestModule {
    return {
        request,
        delete: (url, options = {}) => request(url, { ...options, method: "DELETE" }),
        get: (url, options = {}) => request(url, { ...options, method: "GET" }),
        post: (url, body, options = {}) => request(url, { ...options, method: "POST" }, body),
        put: (url, body, options = {}): Promise<RequestData> => request(url, { ...options, method: "PUT" }, body),
        patch: (url, body, options): Promise<RequestData> => request(url, { ...options, method: "PATCH" }, body)
    };
}

export default createModule();
