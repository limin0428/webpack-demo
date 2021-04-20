// import './index.css'
// import './index.less'
// import './index.scss'

// import React from 'react'
// import ReactDOM from 'react-dom'
// const sum = (a, b) => a + b
// console.log('sum', sum)
// ReactDOM.render(<h1>lm</h1>, document.querySelector('#root'))
/**
 * 
 * @param {*} target 装饰器目标
 * @param {*} key 装饰的key PI
 * @param {*} descriptor 属性描述
 */
// function readonly (target, key, descriptor) {
//   descriptor.writable = false;
// }
// class Person {
//   @readonly PI = 3.14
// }
// let p = new Person()
// p.PI = 1
// console.log(p)

// require('@babel/polyfill')
// let promise = new Promise((resolve, reject) => {
//   resolve(1)
// })
// console.log(promise)

// const Promise = require('babel-runtime/core-js/promise')
let promise = new Promise((resolve, reject) => {
  resolve(2)
})
console.log(promise)