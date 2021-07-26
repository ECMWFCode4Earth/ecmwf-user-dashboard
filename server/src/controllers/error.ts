import { RequestHandler } from "express";
import { Payload } from "../utils/json";


export const notFound: RequestHandler = (req, res, _) => {
  const payload = new Payload();
  res.status(payload.status).json(payload.json);
};
