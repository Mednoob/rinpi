import { extend } from "../../utils/request.js";

const request = extend("https://nekos.life/api/v2");

function fetch(...args: Parameters<typeof request.get>): Promise<any> {
    return request.get(...args).then(res => JSON.parse(res.buffer.toString()));
}

type TR<T extends string> = Record<T, string>;
type URLResult = TR<"url">;

export function spoiler(text: string): Promise<string> {
    return fetch("/spoiler", {
        query: {
            text
        }
    }).then((x: TR<"owo">) => x.owo);
}

export function owoify(text: string): Promise<string> {
    return fetch("/owoify", {
        query: {
            text
        }
    }).then((x: TR<"owo">) => x.owo);
}

export const eightBall = (): Promise<URLResult & { response: string }> => fetch("/8ball");
export const fact = (): Promise<string> => fetch("/fact").then((x: TR<"fact">) => x.fact);
export const name = (): Promise<string> => fetch("/name").then((x: TR<"name">) => x.name);
export const cat = (): Promise<string> => fetch("/cat").then((x: TR<"cat">) => x.cat);
export const why = (): Promise<string> => fetch("/why").then((x: TR<"why">) => x.why);

function img(text: string): () => Promise<string> {
    return () => fetch(`/img/${text}`).then((x: URLResult) => x.url);
}
export const image = {
    wallpaper: img("wallpaper"),
    foxGirl: img("fox_girl"),
    eightBall: img("8ball"),
    "8ball": img("8ball"),
    avatar: img("avatar"),
    cuddle: img("cuddle"),
    lizard: img("lizard"),
    tickle: img("tickle"),
    nekoGif: img("ngif"),
    goose: img("goose"),
    spank: img("spank"),
    waifu: img("waifu"),
    feed: img("feed"),
    gasm: img("gasm"),
    gecg: img("gecg"),
    kiss: img("kiss"),
    lewd: img("lewd"),
    meow: img("meow"),
    neko: img("neko"),
    ngif: img("ngif"),
    smug: img("smug"),
    slap: img("slap"),
    woof: img("woof"),
    pat: img("pat"),
    hug: img("hug")
};
