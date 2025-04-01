// 14. Create a timer that logs “Done” every 2 seconds and stops after 3 times using
// setInterval.



const timerFunction = () => {
    let timerCount = 0;
    const interval = setInterval(() => {
        console.log("done");
        timerCount++;
        if (timerCount === 3) clearInterval(interval);
    }, 2000);

}

timerFunction();