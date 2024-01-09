const express = require('express');
const axios = require('axios');
const app = express();
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
//public_users.get('/',function (req, res) {
//  return res.status(200).send(json.stringify(books));
//});
const fetchBooksAsync = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return books;
};
  
app.get('/', async (req, res) => {
    const fetchedBooks = await fetchBooksAsync();
    return res.status(200).send(json.stringify(fetchedBooks));
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  return res.status(200).send(books[req.params.isbn]);
});
//const getBookByISBNAsync = async (isbn) => {
//    await new Promise(resolve => setTimeout(resolve, 1000));
//    return books[isbn];
//};
//app.get('/isbn/:isbn', async (req, res) => {
//    try {
//      const isbn = req.params.isbn;
//      const book = await getBookByISBNAsync(isbn);
//      if (book) {
//        res.status(200).json(book);
//      } else {
//        res.status(404).send('Book not found');
//      }
//    } catch (error) {
//      console.error('Error getting book by ISBN:', error);
//      res.status(500).send('Internal Server Error');
//    }
//});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let booksfiltered = (Object.values(books)).filter(book=>book.author===req.params.author);
    return res.status(200).send(booksfiltered);
});
//const getBooksByAuthorAsync = async (author) => {
//    await new Promise(resolve => setTimeout(resolve, 1000));
//    return Object.values(books).filter(book => book.author === author);
//  };  
//app.get('/author/:author', async (req, res) => {
//    try {
//      const author = req.params.author;
//      const booksFiltered = await getBooksByAuthorAsync(author);
//      if (booksFiltered.length > 0) {
//        res.status(200).json(booksFiltered);
//      } else {
//        res.status(404).send('Books by author not found');
//      }
//    } catch (error) {
//      console.error('Error getting books by author:', error);
//      res.status(500).send('Internal Server Error');
//    }
//});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let booksfiltered = (Object.values(books)).filter(book=>book.title===req.params.title);
    return res.status(200).send(booksfiltered);
});
//const getBooksByTitleAsync = async (title) => {
//    await new Promise(resolve => setTimeout(resolve, 1000));
//    return Object.values(books).filter(book => book.title === title);
//};
//app.get('/title/:title', async (req, res) => {
//    try {
//      const title = req.params.title;
//      const booksFiltered = await getBooksByTitleAsync(title);
//      if (booksFiltered.length > 0) {
//        res.status(200).json(booksFiltered);
//      } else {
//        res.status(404).send('Books by title not found');
//      }
//    } catch (error) {
//      console.error('Error getting books by title:', error);
//      res.status(500).send('Internal Server Error');
//    }
//});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  return res.status(200).send(books[req.params.isbn].reviews);
});

module.exports.general = public_users;
