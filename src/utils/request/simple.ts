import request from "./request.js";

type K = Exclude<keyof (typeof request), "default">;
type S = (...args: Parameters<typeof addQueryToURL>) => ReturnType<typeof request.request>;

function addQueryToURL(url: Rinpi.URLLike, query: Record<string, boolean | number | string> = {}): URL {
    const urlObj = new URL(typeof url === "string" ? url : url.href);

    for (const [key, value] of Object.entries(query)) {
        urlObj.searchParams.set(key, (typeof value === "boolean" ? Number(value) : value).toString());
    }

    return urlObj;
}

type CF = (path: string, query?: Record<string, boolean | number | string>) => ReturnType<typeof request.request>;

function create(
    baseUrl: Rinpi.URLLike
): Record<K, CF> {
    const base = new URL(typeof baseUrl === "string" ? baseUrl : baseUrl.href);
    const modules: Record<K, CF> = {} as any;

    for (const key of Object.keys(request)) {
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        modules[key as K] = (path, query = {}) => {
            const url = new URL(base.href);
            url.pathname = [...base.pathname.split("/"), ...path.split("/").filter(Boolean)].join("/");

            const urlObj = addQueryToURL(url, query);
            return request[key as K](urlObj, {});
        };
    }

    return modules;
}

function createModule(): Record<K, S> & { create: typeof create } {
    const modules: Record<K, S> = {} as any;

    for (const key of Object.keys(request)) {
        modules[key as K] = (...args: Parameters<typeof addQueryToURL>) => {
            const url = addQueryToURL(...args);
            return request[key as K](url, {});
        };
    }

    return {
        ...modules,
        create
    };
}

export default createModule();
