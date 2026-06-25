import { NextFunction, Request, Response } from "express"

export const sanitizeBookInput = (req: Request, res: Response, next: NextFunction) => {
    req.body.sanitizedBookInput = {
        title: req.body.title,
        authors: req.body.authors,
        publisher: req.body.publisher,
        pageCount: req.body.pageCount,
        rating: req.body.rating,
        cover: req.body.cover,
        isAvailable: req.body.isAvailable,
    }

    Object.keys(req.body.sanitizedBookInput).forEach((key) => {
        if (req.body.sanitizedBookInput[key] === undefined) {
            delete req.body.sanitizedBookInput[key]
        }
    })

    next()
}