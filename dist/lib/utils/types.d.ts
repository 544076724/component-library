import type { App } from 'vue';
export declare type AnyFunction<T> = (...args: any[]) => T;
export declare type SFCWithInstall<T> = T & {
    install(app: App): void;
};
