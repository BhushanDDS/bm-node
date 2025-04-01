// 11. Using Promises, write a function getData() that resolves after 1 second with the message “Data fetched”. Then, call it and log the result.


const getData = () => {

        return new Promise((res, rej) => {
            setTimeout(() => {
                res("Data Fetched")
            }, 1000);

        })
    }
    // 1
getData().then(console.log).catch(console.log)
    // 2
const fethcData = async() => {
    try {
        const res = await getData();
        console.log(res);

    } catch (error) {
        console.log(error);

    }
}

fethcData();