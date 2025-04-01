// 13. Write a function using process.nextTick() that logs “Tick callback executed”.
// Then, call it along with a Promise.resolve() and a setTimeout(). Observe and
// explain the output order.

Promise.resolve().then(() => console.log("Promise resolved"));
setTimeout(() => console.log("setTimeout executed"), 0);
process.nextTick(() => console.log("process.nextTick executed"));