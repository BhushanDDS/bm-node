const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("Original Array:", numbers);

const doubled = numbers.map(num => num * 2);
console.log("Mapped (Doubled) Array:", doubled);

const evens = numbers.filter(num => num % 2 === 0);
console.log("Filtered (Even Numbers):", evens);

const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log("Reduced (Sum of Numbers):", sum);