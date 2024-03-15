import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Request, Response } from "express";
import { getDBStatus } from "../repository";

const health = async (_req: Request, res: Response) => {
  await getDBStatus();
  res.status(StatusCodes.OK).send(ReasonPhrases.OK);
};

export default health;
