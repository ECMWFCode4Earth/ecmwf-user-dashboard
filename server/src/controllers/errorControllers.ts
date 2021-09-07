import { RequestHandler, ErrorRequestHandler } from "express";


export const notFoundController: RequestHandler = (req, res, _) => {
  res.status(404).json({ success: false, message: "Not found" });
};


export const defaultErrorController: ErrorRequestHandler = (err, req, res, _) => {
  res.status(500).json({ success: false, message: "Internal server error" });
};
