const pathToRegExp = require('path-to-regexp')
const path = '/hw/:age'

const keys = []
// 【sensitive】：是否区分大小写
// 【strict】：true 代表不允许 /hw/25/ ，false 代表允许
// 【end】：true 代表只能到 /hw/25 或者 /hw/25/，false 代表后面可以继续 /hw/25/abc
// 通常是 {end: true, strict: true} 一起使用
const reg = pathToRegExp(path, keys, {strict: false, end: false})
console.log('pathToRegExp ->', reg)
console.log('keys ->', keys)
console.log(reg.exec('/hw/20/gd'))