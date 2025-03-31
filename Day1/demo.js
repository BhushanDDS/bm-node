/*
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Data received");
        // reject("Error occurred"); 
    }, 2000);
});

promise
    .then(response => console.log(response))
    .catch(error => console.log(error));


const fetchthings = async() => {
    const res = await promise();
    const data = res.json();
    console.log(data);
}



const functionsSomething = () => {

    return new Promise((res, rej) => {
        res("done");
    })

}


const getPromice = async() => {
    const res = await functionsSomething();
    const data = res.json();
}

getPromice();
*/


// const getTitles = async() => {
//     const res = await fetch(`https://fakestoreapi.com/products/1`);
//     const titles = await res.json();
//     console.log(titles);

// }

const getTitles = async() => {
    const res = await fetch(`https://fakestoreapi.com/products/1`);
    const titles = await res.json();
    console.log(titles);

}
getTitles();