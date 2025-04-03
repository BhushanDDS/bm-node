const { json } = require('body-parser');
const express = require('express');
const { log } = require('node:console');
const app = express();

app.use(express.json());

let users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];


app.get("/users", (req, res) => {

    res.status(200);
    res.json(users);
})



app.post("/users", (req, res) => {

    const name = req.body.name;


    if (!name) {
        return res.status(400).json({ error: "Name is required" });

    }
    const newUser = {
        id: users.length + 1,
        name
    }
    users.push(newUser);
    res.status(201);
    res.json(users)
})

app.delete("/remove", (req, res) => {

    const uId = req.body.uid;

    users = users.filter((val) => val.id != uId);
    res.status(200);
    res.json({ message: "User Deleted Suceessfullt", users })

})



app.put("/users/:id", (req, res) => {
    const uId = parseInt(req.params.id);
    const { name, email } = req.body;

    let user = users.find((user) => user.id === uId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (name) user.name = name;
    if (email) user.email = email;

    res.status(200).json({ message: "User updated successfully", user });
});

app.listen(3000, () => {
    console.log("done");

})