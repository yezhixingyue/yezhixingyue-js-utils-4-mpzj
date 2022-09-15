export interface ICreateAnimationOptions {
    from: number;
    to: number;
    totalMS?: number;
    duration?: number;
    onmove?: (num: number) => void;
    onend?: () => void;
}
