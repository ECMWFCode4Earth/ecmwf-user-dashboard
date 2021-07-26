import { RequestHandler } from "express";
import axios from "axios";
import { CustomResponse } from "../utils/json";


export const ping: RequestHandler = (req, res, _) => {
  const response = new CustomResponse().success({});
  res.status(response.status).json(response.json);
};


export const serviceStatus: RequestHandler = async (req, res, _) => {
  const response = new CustomResponse();

  try {
    const data = (await axios.get("https://www.ecmwf.int/ecmwf_status/status")).data;
    const nodes = data["nodes"];
    response.success(nodes.map((node: any) => node.node));
  } catch (e) {
    console.error(e);
    response.error();
  }

  res.status(response.status).json(response.json);
};


export const openChartsProducts: RequestHandler = async (req, res, _) => {
  const response = new CustomResponse();

  try {
    const data = (await axios.get("https://apps.ecmwf.int/webapps/opencharts-api/v1/packages/opencharts/products/")).data;
    response.success(data);
  } catch (e) {
    console.log(e);
    response.error();
  }

  res.status(response.status).json(response.json);
};
