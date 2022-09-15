/**
 * Cookle管理工具类
 *
 * @export
 * @class Cookie
 */
export declare class Cookie {
    private domain;
    constructor(domain: string);
    /**
     * 设置cookie
     *
     * @param {string} key cookie的键
     * @param {string} value cookie的值
     * @param {number} t  单位为秒
     * @memberof Cookie
     */
    setCookie(key: string, value: string, t: number): void;
    /**
     * 删除cookie
     *
     * @param {string} key  要删除的cookie的键名称
     * @memberof Cookie
     */
    removeCookie(key: string): void;
    getCookie(key: string): string | undefined;
}
