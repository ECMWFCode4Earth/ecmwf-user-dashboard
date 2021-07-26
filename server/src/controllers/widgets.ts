import { RequestHandler } from "express";
import axios from "axios";
import { Payload } from "../utils/json";


export const ping: RequestHandler = (req, res, _) => {
  const payload = new Payload().success({});
  res.status(payload.status).json(payload.json);
};


export const serviceStatus: RequestHandler = async (req, res, _) => {
  const payload = new Payload();

  try {
    const resp = await axios.get("https://www.ecmwf.int/ecmwf_status/status");
    const nodes = resp.data["nodes"];
    payload.success(nodes.map((node: any) => node.node));
  } catch (e) {
    console.error(e);
    payload.error();
  }

  res.status(payload.status).json(payload.json);
};


export const openchartProducts: RequestHandler = async (req, res, _) => {
  const payload = new Payload();

  try {
    const resp = await axios.get("https://apps.ecmwf.int/webapps/opencharts-api/v1/packages/opencharts/products/");
    payload.success(resp.data);
  } catch (e) {
    console.log(e);
    payload.error();
  }

  res.status(payload.status).json(payload.json);
};
