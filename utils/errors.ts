import {NextFunction, Request, Response} from "express";

export  class ValidationError extends  Error{}
export const handleError = (e: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(e);

    res
        .status(e instanceof ValidationError ? 400 : 500)
        .json({ message: e instanceof ValidationError ? e.message: "Sorry please try again later. :/"})
}