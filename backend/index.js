import express, { request, response } from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Index get request
app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to MERN")
})

// Get all books
app.get("/books", async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }

})

// Get book by id
app.get("/books/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const books = await Book.findById(id);
        return response.status(200).send(books);
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }

})

// Create new book
app.post("/books", async (request, response) => {
    try {
        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishYear) {
            return response.status(400).send('Send all fields: title, author, publishYear');
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }
        const book = await Book.create(newBook);
        return response.status(201).send(book);

    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
})

// Update a book
app.put("/books/:id", async (request, response) => {
    try {
        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishYear) {
            return response.status(400).send('Send all fields: title, author, publishYear');
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).send('Book not found')
        }
        return response.status(200).send('Book updated successfully')
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }

})

// Delete a book
app.delete("/books/:id", async (request, response) => {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id)
    if (!result) {
        return response.status(404).send('Book not found')
    }
    return response.status(200).send('Book deleted successfully')
})


mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`App is listening at port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error);
    })