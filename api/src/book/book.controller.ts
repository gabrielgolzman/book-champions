import { Request, Response } from "express";
import { BookRepository } from "./book.repository.js";
import { BookService } from "./book.service.js";

const service = new BookService(new BookRepository());

export const findAll = (req: Request, res: Response) => {
    res.json(service.findAll());
}

export const findOne = (req: Request, res: Response) => {
    const id = req.params.id as string;
    const book = service.findOne(id);

    if (!book)
        return res.status(404).send({ message: "Book not found" });

    return res.json(book);
}

export const create = (req: Request, res: Response) => {
    const book = service.create(req.body.sanitizedBookInput);

    return res.status(201).json({ message: "Book added", data: book });
}

export const update = (req: Request, res: Response) => {
    const id = req.params.id as string;
    const book = service.update(id, req.body.sanitizedBookInput);

    if (!book)
        return res.status(404).send({ message: "Book not found" });

    res.json({ message: "Book updated successfully", data: book });
}

export const remove = (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = service.remove(id);

    if (!result)
        return res.status(500).json({ message: "There was an internal error deleting the book" })

    return res.json({ message: `Book with id: ${result.id} successfully deleted` })
}
