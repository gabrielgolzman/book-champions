import { Request, Response } from "express";
import { BookRepository } from "./book.repository.js";
import { Book } from "./book.js";

const repository = new BookRepository();

export const findAll = (req: Request, res: Response) => {
    res.json(repository.findAll());
}

export const findOne = (req: Request, res: Response) => {
    const id = req.params.id as string; // cast
    const book = repository.findOne({ id })

    if (!book)
        return res.status(404).send({ message: "Book not found" });

    return res.json(book);
}

export const create = (req: Request, res: Response) => {
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
}

export const update = (req: Request, res: Response) => {
    const book = repository.update({ id: req.params.id, ...req.body.sanitizedBookInput });

    if (!book)
        return res.status(404).send({ message: "Book not found" });

    res.json({ message: "Book updated successfully", data: book });
}

export const remove = (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = repository.delete({ id })

    if (!result)
        return res.status(500).json({ message: "There was an internal error deleting the book" })

    return res.json({ message: `Book with id: ${result.id} successfully deleted` })
}