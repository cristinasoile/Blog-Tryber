import { NextFunction, Request, Response } from "express";

class Errorhandler {
  public static handle(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Response {
    if (err instanceof Error && 404) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(500).json({ message: "Erro não identificado" });
  }
}

export default Errorhandler;
