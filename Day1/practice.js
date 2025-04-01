const promiceHandler = () => {

    return new Promise((res, rej) => {

        res("req accepted")

    })
}


const promiceFetcher = async() => {
    try {
        const response = await promiceHandler();
        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.log(error);

    }

}
promiceFetcher();


const givemedata = () => {
    return new Promise((res, rej) => {
        try {
            res(fetch(``));
        } catch (error) {
            rej(error);
        }
    })
}

//1
givemedata().then((res) => res.json()).then((data) => console.log(data)).catch(console.log);
//2
const fetchdata = async() => {
    try {
        const response = await givemedata();
        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.log(error);

    }
}