"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenClass = void 0;
class TokenClass {
    /**
     * Creates an instance of TokenClass.
     * @param {ITokenClassOption} option
     * @memberof TokenClass
     */
    constructor(option) {
        this.labelName = {
            token: '',
            user: '',
        };
        this.getUserInfoFunc = null;
        this.successCode = 1000;
        if (!option || Object.prototype.toString.call(option) !== '[object Object]') {
            throw new TypeError('Invalid parameter');
        }
        const { labelName, getUserInfoFunc, successCode } = option;
        if (!labelName || typeof labelName !== 'object'
            || !labelName.token || typeof labelName.token !== 'string'
            || !labelName.user || typeof labelName.user !== 'string'
            || !getUserInfoFunc || Object.prototype.toString.call(getUserInfoFunc) !== '[object Function]'
            || (typeof successCode !== 'undefined' && (typeof successCode !== 'number' || Number.isNaN(successCode)))) {
            throw new TypeError('Invalid parameter');
        }
        this.labelName.token = labelName.token;
        this.labelName.user = labelName.user;
        this.getUserInfoFunc = getUserInfoFunc;
        if (typeof successCode === 'number' && !Number.isNaN(successCode))
            this.successCode = successCode;
    }
    /**
     * 获取到今天24点时的时间戳
     */
    getTodayTimestampIn24Am() {
        const date = new Date();
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(999);
        return date.getTime();
    }
    removeToken() {
        localStorage.removeItem(this.labelName.token);
        localStorage.removeItem(this.labelName.user);
    }
    setToken(token) {
        if (!token)
            return;
        this.removeToken();
        const timestamp = this.getTodayTimestampIn24Am();
        const temp = {
            token,
            timestamp,
        };
        localStorage.setItem(this.labelName.token, JSON.stringify(temp));
    }
    getToken() {
        const temp = localStorage.getItem(this.labelName.token); // 2.1 获取到token信息，可能为undefined
        const obj = temp ? JSON.parse(temp) : null;
        let token;
        if (obj) {
            if (obj.timestamp && obj.timestamp > Date.now()) {
                token = obj.token;
            }
            else {
                this.removeToken();
            }
        }
        return token;
    }
    getUserInfo(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.getUserInfoFunc) {
                throw new Error('no method for get user');
            }
            const userStrData = localStorage.getItem(this.labelName.user);
            if (!userStrData) {
                const res = yield this.getUserInfoFunc().catch(() => null);
                if (res && res.status === 200 && res.data.Status === this.successCode) {
                    localStorage.setItem(this.labelName.user, JSON.stringify(res.data.Data));
                    return res.data.Data;
                }
                throw new Error(res && res.data ? res.data.Message : '获取用户信息失败');
            }
            const data = JSON.parse(userStrData);
            if (data.Token === token)
                return data;
            localStorage.removeItem(this.labelName.user);
            return this.getUserInfo(token);
        });
    }
}
exports.TokenClass = TokenClass;
