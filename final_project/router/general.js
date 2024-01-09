const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (!username) {
        return res.status(400).send("Username is empty");
    }
    let userfiltered = users.filter(user=>user.username===username);
    if (userfiltered.length > 0) {
        return res.status(400).send("Username already registered");
    }
    users.push({username: username, password: password});
    return res.status(200).send("User registered");
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).send(json.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  return res.status(200).send(books[req.params.isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let booksfiltered = (Object.values(books)).filter(book=>book.author===req.params.author);
    return res.status(200).send(booksfiltered);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let booksfiltered = (Object.values(books)).filter(book=>book.title===req.params.title);
    return res.status(200).send(booksfiltered);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  return res.status(200).send(books[req.params.isbn].reviews);
});

module.exports.general = public_users;
