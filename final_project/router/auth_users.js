const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{
    let validUser = users.filter(user => user.username === username);
    return (validUser.length > 0);
}

const authenticatedUser = (username,password)=>{
    let founduser = users.filter(user => user.username === username && user.password === password);
    return founduser.length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username) {
        return res.status(404).json({message: "Username Empty"});
    }
    if (!isValid(username)) {
        return res.status(404).json({message: "Username not registered"});
    }
    if (!authenticatedUser(username,password)) {
        return res.status(404).json({message: "Wrong password"});
    }
    let accessToken = jwt.sign({data: username}, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {accessToken};
    return res.status(200).send("User successfully logged in");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    let isbn = req.params.isbn;
    let review = req.query.reviews;
    let username = req.username;
        books[isbn].reviews = {
            username:username,
            info:review
        };
        return res.status(200).send("Review added");
}
);

regd_users.delete("/auth/review/:isbn", (req, res) => {
    let isbn = req.params.isbn;
    let username = req.username;
    delete books[isbn].reviews;
    return res.status(200).send("Review deleted");
}
);

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
