import { Request, Response, NextFunction } from "express";

export type Route = {
    path: string;
    method: "get" | "post" | "put" | "delete" | "patch";
    handler: (req: Request, res: Response, next: NextFunction) => void;
}