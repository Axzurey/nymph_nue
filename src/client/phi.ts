export function* next<T extends any[] | Record<any, any>>(x: T) {
    for (let key in x) {
        let v = x[key] as T[keyof T];
        yield [key, v] as [keyof T, T[keyof T]];
    }
}

export function fillDefaults<T extends Record<any, any>>(passed: Partial<T>, defaults: T): T {
    for (const [k, v] of next(defaults)) {
        if (passed[k]) continue;
        passed[k] = v;
    }
    return passed as T;
}

export type spreadNestedKey<T extends Record<K, any>[] | readonly Record<K, any>[], K extends string> = {[I in keyof T]: T[I][K]}[number]