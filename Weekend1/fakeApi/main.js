const { get } = require("http")

const fetchUserData = (userId) => {

    return new Promise((res, rej) => {
        setTimeout(() => {
            if (userId) {
                res({ id: userId, name: "demo" })
            } else {
                rej("enter valid user Id")
            }
        }, 2000)
    })

}


const getData = async(userId) => {
    try {
        const res = await fetchUserData(userId);
        console.log(res);

    } catch (error) {
        console.log(error);

    }
}

getData();