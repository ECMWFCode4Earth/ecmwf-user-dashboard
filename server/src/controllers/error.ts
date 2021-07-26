import { RequestHandler } from "express";
import { CustomResponse } from "../utils/json";


export const notFound: RequestHandler = (req, res, _) => {
  const response = new CustomResponse();
  res.status(response.status).json(response.json);
};
