import express from "express";
import cors from "cors";
import { bookRouter } from "./book/book.routes.js";
import { authorRouter } from "./author/author.routes.js";

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use("/api/books", bookRouter)
app.use("/api/authors", authorRouter)

app.use((_, res) => {
    return res.status(404).send({ message: "Resource not found" });
})

app.listen(PORT, () => {
    console.log(`Server listening in ${PORT}`);
})
