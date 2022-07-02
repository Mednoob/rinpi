declare namespace Rinpi {
    type URLLike = URL | string;
}

type UnPromise<T> = T extends Promise<infer U> ? U : T;
