import { NextFunction, Request, Response } from "express"

export const sanitizeAuthorInput = (req: Request, res: Response, next: NextFunction) => {
    req.body.sanitizedAuthorInput = {
        name: req.body.name,
    }

    Object.keys(req.body.sanitizedAuthorInput).forEach((key) => {
        if (req.body.sanitizedAuthorInput[key] === undefined) {
            delete req.body.sanitizedAuthorInput[key]
        }
    })

    next()
}
