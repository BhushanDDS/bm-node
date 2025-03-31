function delayedSum(a, b, callback) {
    setTimeout(() => {
        callback(a + b);
    }, 1000);
}

delayedSum(2, 3, sum => console.log("Sum:", sum));