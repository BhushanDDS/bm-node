// 12. Create a script that sets two timers: one using setTimeout and another using
// setImmediate. Log which one executes first and explain why.


setTimeout(() => console.log("setTimeout executed"), 0);
setImmediate(() => console.log("setImmediate executed"));