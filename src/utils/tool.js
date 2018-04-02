/** 2018-3-29 0029
  * author: Legal High
  * function: 通用工具
  */

// 是否为数组
export function isArray(obj)  {
  if(Array.isArray){
    return Array.isArray(obj);
  }else{
    return Object.prototype.toString.call(obj) === "[object Array]";
  }
}
// 是否为对象
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
// 是否为字符串
export function isString(obj) {
  return Object.prototype.toString.call(obj) === "[object String]";
}
