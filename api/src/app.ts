import express from "express";
import { Book } from "./book/book.js";
import { sanitizeBookInput } from "./validations.js";
import { BookRepository } from "./book/book.repository.js";

const app = express();

const PORT = 3000;

const repository = new BookRepository();

app.use(express.json());

app.get("/api/books", (req, res) => {
    res.json(repository.findAll());
})

app.get("/api/books/:id", (req, res) => {
    const book = repository.findOne({ id: req.params.id })

    if (!book)
        return res.status(404).send({ message: "Book not found" });

    return res.json(book);
})

app.post("/api/books", sanitizeBookInput, (req, res) => {
    const input = req.body.sanitizedBookInput;

    const book = new Book(
        input.title,
        input.authors,
        input.publisher,
        input.pageCount,
        input.rating,
        input.cover,
        input.isAvailable,
    )

    repository.add(book);

    return res.status(201).json({ message: "Book added", data: book });

});

app.put("/api/books/:id", sanitizeBookInput, (req, res) => {
    const book = repository.update({ id: req.params.id, ...req.body.sanitizedBookInput });

    if (!book)
        return res.status(404).send({ message: "Book not found" });

    res.json({ message: "Book updated successfully", data: book });
});

app.patch('/api/books/:id', sanitizeBookInput, (req, res) => {
    const book = repository.update({ id: req.params.id, ...req.body.sanitizedBookInput });

    if (!book)
        return res.status(404).send({ message: "Book not found" });

    res.json({ message: "Book updated successfully", data: book });
})


app.delete("/api/books/:id", (req, res) => {
    const result = repository.delete({ id: req.params.id })

    if (!result)
        return res.status(500).json({ message: "There was an internal error deleting the book" })

    return res.json({ message: `Book with id: ${result.id} successfully deleted` })
})


app.listen(PORT, () => {
    console.log(`Server listening in ${PORT}`);
})
