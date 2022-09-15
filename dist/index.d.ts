import { ICreateAnimationOptions } from "./types";
/**
 * 创建一个js动画
 *
 * @param {*} options from、to、totalMS、duration、onend、onmove
 */
export declare const createAnimation: (options: ICreateAnimationOptions) => void;
/**
 * 转换日期为如下字符串格式：2020-10-20
 *
 * @export
 * @param {(Date | string | number)} [date] 可传递Date类型 | 2020-01-10T01:50:50.001 | 时间戳：1663149572998
 * @returns 2020-10-20格式类型
 */
export declare const getTimeConvertFormat: (date?: string | number | Date | undefined) => string;
export interface IParameterType {
    [key: string]: any;
}
/**
* 从来源对象中还原值到要改变的对象中；数组类型属性暂时使用JSON.parse(JSON.stringify)方式简单处理，后续根据需要修改
*
* @param {Object} target 要改变的对象
* @param {Object} origin 来源对象
*/
export declare const restoreInitDataByOrigin: (target: IParameterType, origin: IParameterType) => void;
export { TokenClass } from './utils/TokenClass';
export { Cookie } from './utils/Cookie';
