import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();


// Get all books
router.get("/", async (request, response) => {
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
router.get("/:id", async (request, response) => {
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
router.post("/", async (request, response) => {
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
router.put("/:id", async (request, response) => {
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
router.delete("/:id", async (request, response) => {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id)
    if (!result) {
        return response.status(404).send('Book not found')
    }
    return response.status(200).send('Book deleted successfully')
})

export default router;