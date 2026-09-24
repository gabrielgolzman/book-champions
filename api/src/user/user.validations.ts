import { NextFunction, Request, Response } from "express"

export const sanitizeRegisterInput = (req: Request, res: Response, next: NextFunction) => {
    req.body.sanitizedRegisterInput = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }

    Object.keys(req.body.sanitizedRegisterInput).forEach((key) => {
        if (req.body.sanitizedRegisterInput[key] === undefined) {
            delete req.body.sanitizedRegisterInput[key]
        }
    })

    next()
}

export const sanitizeLoginInput = (req: Request, res: Response, next: NextFunction) => {
    req.body.sanitizedLoginInput = {
        email: req.body.email,
        password: req.body.password,
    }

    next()
}
