interface ITokenCache {
  token: string;
  timestamp: number;
}

export interface ITokenClassOption {
  labelName: {
    token: string
    user: string
  }
  getUserInfoFunc: () => Promise<any>
  successCode?: number
}

export class TokenClass {
  private labelName = {
    token: '',
    user: '',
  }

  private getUserInfoFunc: null | (() => Promise<any>) = null

  private successCode: '' | number = 1000

  /**
   * 获取到今天24点时的时间戳
   */
  private getTodayTimestampIn24Am() {
    const date = new Date();
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    date.setMilliseconds(999);
    return date.getTime();
  }

  public removeToken() {
    localStorage.removeItem(this.labelName.token);
    localStorage.removeItem(this.labelName.user);
  }

  public setToken(token: string) {
    if (!token) return;
    this.removeToken();
    const timestamp = this.getTodayTimestampIn24Am();
    const temp: ITokenCache = {
      token,
      timestamp,
    };
    localStorage.setItem(this.labelName.token, JSON.stringify(temp));
  }

  public getToken() {
    const temp = localStorage.getItem(this.labelName.token); // 2.1 获取到token信息，可能为undefined
    const obj: ITokenCache | null = temp ? JSON.parse(temp) : null;
    let token;
    if (obj) {
      if (obj.timestamp && obj.timestamp > Date.now()) {
        token = obj.token;
      } else {
        this.removeToken();
      }
    }
    return token;
  }

  public async getUserInfo<T>(token: string): Promise<T | Error> { // 获取登录用户信息
    if (!this.getUserInfoFunc) {
      throw new Error('no method for get user');
    }

    const userStrData = localStorage.getItem(this.labelName.user);

    if (!userStrData) {
      const res = await this.getUserInfoFunc().catch(() => null);

      if (res && res.status === 200 && res.data.Status === this.successCode) {
        localStorage.setItem(this.labelName.user, JSON.stringify(res.data.Data));

        return res.data.Data;
      }

      throw new Error(res && res.data ? res.data.Message : '获取用户信息失败');
    }

    const data = JSON.parse(userStrData);
    if (data.Token === token) return data;

    localStorage.removeItem(this.labelName.user);

    return this.getUserInfo(token);
  }

  /**
   * Creates an instance of TokenClass.
   * @param {ITokenClassOption} option
   * @memberof TokenClass
   */
  constructor(option: ITokenClassOption) {
    if (!option || Object.prototype.toString.call(option) !== '[object Object]') {
      throw new TypeError('Invalid parameter');
    }

    const { labelName, getUserInfoFunc, successCode } = option;

    if (
      !labelName || typeof labelName !== 'object'
      || !labelName.token || typeof labelName.token !== 'string'
      || !labelName.user || typeof labelName.user !== 'string'
      || !getUserInfoFunc || Object.prototype.toString.call(getUserInfoFunc) !== '[object Function]'
      || (typeof successCode !== 'undefined' && (typeof successCode !== 'number' || Number.isNaN(successCode)))
    ) {
      throw new TypeError('Invalid parameter');
    }

    this.labelName.token = labelName.token;
    this.labelName.user = labelName.user;
    this.getUserInfoFunc = getUserInfoFunc;
    if (typeof successCode === 'number' && !Number.isNaN(successCode)) this.successCode = successCode;
  }
}
