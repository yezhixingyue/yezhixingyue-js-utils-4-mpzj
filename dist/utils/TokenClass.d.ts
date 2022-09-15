export interface ITokenClassOption {
    labelName: {
        token: string;
        user: string;
    };
    getUserInfoFunc: () => Promise<any>;
    successCode?: number;
}
export declare class TokenClass {
    private labelName;
    private getUserInfoFunc;
    private successCode;
    /**
     * 获取到今天24点时的时间戳
     */
    private getTodayTimestampIn24Am;
    removeToken(): void;
    setToken(token: string): void;
    getToken(): string | undefined;
    getUserInfo<T>(token: string): Promise<T | Error>;
    /**
     * Creates an instance of TokenClass.
     * @param {ITokenClassOption} option
     * @memberof TokenClass
     */
    constructor(option: ITokenClassOption);
}
