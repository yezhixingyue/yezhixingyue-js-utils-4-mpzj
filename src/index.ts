import { ICreateAnimationOptions } from "./types";

/**
 * 创建一个js动画
 *
 * @param {*} options from、to、totalMS、duration、onend、onmove
 */
export const createAnimation = (options: ICreateAnimationOptions) => {
  let { from } = options; // 起始值
  const { to } = options; // 结束值
  const totalMS = options.totalMS || 1000; // 变化总时间
  const duration = options.duration || 15; // 动画间隔时间
  const times = Math.floor(totalMS / duration); // 变化的次数
  const dis = (to - from) / times; // 每一次变化改变的值
  let curTimes = 0; // 当前变化的次数
  const timerId = setInterval(() => {
    from += dis;
    curTimes += 1; // 当前变化增加一次
    // 无数的可能性
    if (options.onmove) options.onmove(from);
    if (curTimes >= times) {
      // 变化的次数达到了
      from = to; // 变化完成了
      clearInterval(timerId); // 不再变化了
      if (options.onend) options.onend();
    }
  }, duration);
};

/**
 * 转换日期为如下字符串格式：2020-10-20
 *
 * @export
 * @param {(Date | string | number)} [date] 可传递Date类型 | 2020-01-10T01:50:50.001 | 时间戳：1663149572998
 * @returns 2020-10-20格式类型
 */
export const getTimeConvertFormat = (date?: Date | string | number) => {
  let _date = new Date();
  if (date) {
    if (date instanceof Date) {
      _date = date;
    } else {
      _date = new Date(date);
    }
  }

  const _m = _date.getMonth() + 1;
  const _d = _date.getDate();

  const m = (`0${_m}`).slice(-2);
  const d = (`0${_d}`).slice(-2);
  const y = _date.getFullYear();

  const str = `${y}-${m}-${d}`;

  if (/NaN/.test(str)) {
    throw new TypeError('Invalid parameter');
  }

  return str;
}

export interface IParameterType {
  [key: string]: any
}
/**
* 从来源对象中还原值到要改变的对象中；数组类型属性暂时使用JSON.parse(JSON.stringify)方式简单处理，后续根据需要修改
*
* @param {Object} target 要改变的对象
* @param {Object} origin 来源对象
*/
export const restoreInitDataByOrigin = (target: IParameterType, origin: IParameterType) => {
 if (origin && Object.prototype.toString.call(origin) === '[object Object]' && target && Object.prototype.toString.call(target) === '[object Object]') {
   const _obj = target;
   Object.keys(origin).forEach(key => {
     if (Object.prototype.hasOwnProperty.call(_obj, key)) {
       if (origin[key] && Object.prototype.toString.call(origin[key]) === '[object Object]') {
         restoreInitDataByOrigin(target[key], origin[key]);
       } else if (Array.isArray(origin[key])) {
         _obj[key] = JSON.parse(JSON.stringify(origin[key]));
       } else if (origin[key] || origin[key] === 0 || origin[key] === false) {
         _obj[key] = origin[key];
       }
     }
   });
 }
};

export { TokenClass } from './utils/TokenClass';

export {  Cookie } from './utils/Cookie';