import { Request, Response } from "express";
import { AuthorRepository } from "./author.repository.js";
import { AuthorService } from "./author.service.js";

const service = new AuthorService(new AuthorRepository());

export const findAll = async (req: Request, res: Response) => {
    const authors = await service.findAll();
    res.json(authors);
}

export const findOne = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const author = await service.findOne(id);

    if (!author)
        return res.status(404).send({ message: "Author not found" });

    return res.json(author);
}

export const create = async (req: Request, res: Response) => {
    const author = await service.create(req.body.sanitizedAuthorInput);

    return res.status(201).json({ message: "Author added", data: author });
}

export const update = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const author = await service.update(id, req.body.sanitizedAuthorInput);

    if (!author)
        return res.status(404).send({ message: "Author not found" });

    res.json({ message: "Author updated successfully", data: author });
}

export const remove = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await service.remove(id);

    if (!result)
        return res.status(500).json({ message: "There was an internal error deleting the author" })

    return res.json({ message: `Author with id: ${result.id} successfully deleted` })
}
