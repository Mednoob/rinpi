import { simple } from "../../utils/request/index.js";

const request = simple.create("https://nekos.life/api");

function fetch(...args: Parameters<typeof request.get>): Promise<any> {
    return request.get(...args).then(res => JSON.parse(res.buffer.toString()));
}

type TR<T extends string> = Record<T, string>;

export const lewdNeko = (): Promise<string> => fetch("/lewd/neko").then((x: TR<"neko">) => x.neko);
export const lizard = (): Promise<string> => fetch("/lizard").then((x: TR<"url">) => x.url);
export const neko = (): Promise<string> => fetch("/neko").then((x: TR<"neko">) => x.neko);
export const kiss = (): Promise<string> => fetch("/kiss").then((x: TR<"url">) => x.url);
export const hug = (): Promise<string> => fetch("/hug").then((x: TR<"url">) => x.url);
export const pat = (): Promise<string> => fetch("/pat").then((x: TR<"url">) => x.url);
export const why = (): Promise<string> => fetch("/why").then((x: TR<"why">) => x.why);
