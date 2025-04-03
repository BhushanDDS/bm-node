const http = require("node:http");

const fetchExternalUsers = () => {
    const options = {
        hostname: "jsonplaceholder.typicode.com",
        path: "/users?limit",
        method: "GET",
    };

    const req = http.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => {
            data += chunk;
        });

        res.on("end", () => {
            console.log("Response from API:");
            console.log(JSON.parse(data));
        });
    });

    req.on("error", (error) => {
        console.error(" API Request Error:", error);
    });

    req.end();
};

fetchExternalUsers();