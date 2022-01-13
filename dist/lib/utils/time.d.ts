export interface Time {
    day: string;
    hour: string;
    minute: string;
    second: string;
}
declare const getCountdownTime: (timestamp: number) => Time;
export { getCountdownTime };
