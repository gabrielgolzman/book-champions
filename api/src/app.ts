import express from "express";
import { BOOKS_MOCK } from "./book.mock.js";
import { Book } from "./book.js";
import { sanitizeBookInput } from "./validations.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/api/books", (req, res) => {
    res.json(BOOKS_MOCK);
})

app.get("/api/books/:id", (req, res) => {
    const bookIndex = BOOKS_MOCK.findIndex((book) =>
        book.id === req.params?.id);

    if (bookIndex < 0)
        return res.status(404).send({ message: "Book not found" });

    return res.json(BOOKS_MOCK[bookIndex]);
})

app.post("/api/books", (req, res) => {
    const { title, authors, publisher, pageCount, rating, isAvailable, cover } = req.body;

    const book = new Book(
        title,
        authors,
        publisher,
        pageCount,
        rating,
        cover,
        isAvailable,
    )

    BOOKS_MOCK.push(book);

    return res.json(book);

});

app.put("/api/books/:id", (req, res) => {
    const bookIndex = BOOKS_MOCK.findIndex((book) => book.id === req.params.id);

    if (bookIndex < 0)
        return res.status(404).send({ message: "Book not found" });

    BOOKS_MOCK[bookIndex] = {
        ...BOOKS_MOCK[bookIndex],
        ...req.body
    };

    res.json(BOOKS_MOCK[bookIndex]);
});

app.patch('/api/books/:id', sanitizeBookInput, (req, res) => {
    const bookIdx = BOOKS_MOCK.findIndex((book) => book.id === req.params.id)

    if (bookIdx < 0) {
        return res.status(404).send({ message: 'Book not found' })
    }

    Object.assign(BOOKS_MOCK[bookIdx], req.body.sanitizedBookInput)

    return res.status(200).send({ message: 'Book updated successfully', data: BOOKS_MOCK[bookIdx] })
})


app.delete("/api/books/:id", (req, res) => {
    const bookIndex = BOOKS_MOCK.findIndex((book) => book.id === req.params.id);

    if (bookIndex < 0)
        return res.status(404).send({ message: "Book not found" });

    BOOKS_MOCK.splice(bookIndex, 1);

    return res.json({ message: `Book with id: ${req.params.id} successfully deleted` })
})


app.listen(PORT, () => {
    console.log(`Server listening in ${PORT}`);
})
