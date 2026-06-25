import express from "express";
import { bookRouter } from "./book/book.routes.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/api/books", bookRouter)

app.use((_, res) => {
    return res.status(404).send({ message: "Resource not found" });
})

app.listen(PORT, () => {
    console.log(`Server listening in ${PORT}`);
})
