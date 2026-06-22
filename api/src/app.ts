import express from "express";
import { BOOKS_MOCK } from "./book.mock.js";
import { Book } from "./book.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/books", (req, res) => {
    res.json(BOOKS_MOCK);
})

app.get("/books/:id", (req, res) => {
    const bookIndex = BOOKS_MOCK.findIndex((book) =>
        book.id === req.params?.id);

    if (bookIndex < 0)
        return res.status(404).send({ message: "Book not found" });

    return res.json(BOOKS_MOCK[bookIndex]);
})

app.post("/books", (req, res) => {
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

app.put("/books/:id", (req, res) => {
    const bookIndex = BOOKS_MOCK.findIndex((book) => book.id === req.params.id);

    if (bookIndex < 0)
        return res.status(404).send({ message: "Book not found" });

    BOOKS_MOCK[bookIndex] = {
        ...BOOKS_MOCK[bookIndex],
        ...req.body
    };

    res.json(BOOKS_MOCK[bookIndex]);
});

app.delete("/books/:id", (req, res) => {
    const bookIndex = BOOKS_MOCK.findIndex((book) => book.id === req.params.id);

    if (bookIndex < 0)
        return res.status(404).send({ message: "Book not found" });

    BOOKS_MOCK.splice(bookIndex, 1);

    return res.json({ message: `Book with id: ${req.params.id} successfully deleted` })
})


app.listen(PORT, () => {
    console.log(`Server listening in ${PORT}`);
})
