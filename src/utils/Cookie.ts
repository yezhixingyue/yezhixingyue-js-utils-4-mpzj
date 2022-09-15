/**
 * Cookle管理工具类
 *
 * @export
 * @class Cookie
 */
export class Cookie {
  private domain = ''

  constructor(domain: string) {
    this.domain = domain;
  }

  /**
   * 设置cookie
   *
   * @param {string} key cookie的键
   * @param {string} value cookie的值
   * @param {number} t  单位为秒
   * @memberof Cookie
   */
  setCookie(key: string, value: string, t: number) {
    document.cookie = `${key}=${value};max-age=${t};domain=${this.domain};path=/;`;
  }
  /**
   * 删除cookie
   *
   * @param {string} key  要删除的cookie的键名称
   * @memberof Cookie
   */
  removeCookie(key: string) {
    this.setCookie(key, '', -1);
  }
  getCookie(key: string) {
    const list = document.cookie.split('; ');
    for (let i = 0; i < list.length; i += 1) {
      const arr2 = list[i].split('=');
      if (arr2[0] === key) {
        return decodeURI(arr2[1]);
      }
    }
    return undefined;
  }
};
