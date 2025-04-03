//Promise that resolves after 2 seconds

const promise1 = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res("resolved");
        }, 2000);
    })
}


const promise2 = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            rej("rejected");
        }, 2000);
    })
}

const promise3 = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            fetch(`https://fakestoreapi.com/products/1`)
                .then(response => res(response))
                .catch(response => rej(response))
        }, 2000);
    })
}

const getdata2 = async() => {
    try {
        const res = await promise3();
        return await res.json();

    } catch (error) {
        return error;
    }
}

// getdata2().then((data) => console.log(data))

const resolvefecth = async() => {
        const data = await getdata2()
        console.log(data);

    }
    // resolvefecth();




const getdata = () => {
        return promise3().then((res) => res.json())
            .then((data) => data)
            .catch((err) => err)
    }
    // getdata().then((data) => console.log(data))




// promise3().then((response)=>response.json())
//             .then((data)=>console.log(data)
//             )
//             .catch((err)=>console.log("error",err)
//             )

///////////////////////////////

const promise4 = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            fetch(`https://fakestoreapi.com/products/1`)
                .then(response => res(response))
                .catch(response => rej(response))
        }, 2000);
    })
}

const promise5 = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            fetch(`https://fakestoreapi.com/products/1`)
                .then(response => res(response))
                .catch(response => rej(response))
        }, 2000);
    })
}

const promise6 = new Promise((res, rej) => {
    return res("done");
});

const promise7 = new Promise((res, rej) => {
    return rej("thala for a reason");
});


const promise8 = (() => {
    return Promise.resolve("done")
});




//  Promise.all
// Promise.all([promise4(), promise5()]).then(res => Promise.all(res.map((res) => res.json()))).then((data) => console.log(data)).catch((err) => console.log(err))

Promise.all([promise6, promise7]).then(console.log).catch(console.log)