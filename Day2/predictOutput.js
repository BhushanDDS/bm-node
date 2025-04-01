// console.log('Start');
// setTimeout(() => { console.log('Timeout'); }, 0);
// Promise.resolve().then(() => { console.log('Promise'); });
// console.log('End');

// process.nextTick(() => console.log('Tick'));
// Promise.resolve().then(() =>
//     console.log('Promise'));
// console.log('End');

// setImmediate(() => {
//     console.log('Immediate');
// });
// setTimeout(() => {
//     console.log('Timeout');
// }, 0);


// const fs = require('fs');
// fs.readFile('file.txt', () => {
//     setTimeout(() => {
//         console.log('Timer');
//     }, 0);
//     setImmediate(() => {
//         console.log('Immediate');

//     });
// });