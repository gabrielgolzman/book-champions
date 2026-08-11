import { Request, Response } from "express";
import { BookRepository } from "./book.repository.js";
import { BookService } from "./book.service.js";

const service = new BookService(new BookRepository());

export const findAll = async (req: Request, res: Response) => {
    const books = await service.findAll();
    res.json(books);
}

export const findOne = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const book = await service.findOne(id);

    if (!book)
        return res.status(404).send({ message: "Book not found" });

    return res.json(book);
}

export const create = async (req: Request, res: Response) => {
    const book = await service.create(req.body.sanitizedBookInput);

    return res.status(201).json({ message: "Book added", data: book });
}

export const update = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const book = await service.update(id, req.body.sanitizedBookInput);

    if (!book)
        return res.status(404).send({ message: "Book not found" });

    res.json({ message: "Book updated successfully", data: book });
}

export const remove = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await service.remove(id);

    if (!result)
        return res.status(500).json({ message: "There was an internal error deleting the book" })

    return res.json({ message: `Book with id: ${result.id} successfully deleted` })
}
