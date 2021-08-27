import { RequestHandler } from "express";
import axios from "axios";


export const pingController: RequestHandler = (req, res, _) => {
  console.log("ping")
  res.status(200).json({ success: true, message: "Success" });
};


export const serviceStatusController: RequestHandler = async (req, res, _) => {
  try {
    const data = (await axios.get("https://www.ecmwf.int/ecmwf_status/status")).data;
    const nodes = data["nodes"];
    res.status(200).json({ success: false, message: "Success", data: nodes.map((node: any) => node.node) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Internal error" });
  }
};


export const openChartsProductsController: RequestHandler = async (req, res, _) => {
  try {
    const data = (await axios.get("https://apps.ecmwf.int/webapps/opencharts-api/v1/packages/opencharts/products/")).data;
    res.status(200).json({ success: false, message: "Success", data: data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Internal error" });
  }
};


export const eventsController: RequestHandler = async (req, res, _) => {
  try {
    const data = (await axios.get("https://events.ecmwf.int/export/categ/2.json?_=1623050927029&ak=c430e6b8-16d4-41f3-9c57-908a0f60bd0b")).data; // TODO Extract token to env variable
    res.status(200).json({ success: false, message: "Success", data: data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Internal error" });
  }
};


export const satelliteAlertsController: RequestHandler = async (req, res, _) => {
  try {
    const data = (await axios.get("https://apps-dev.ecmwf.int/webapps/opencharts-api/v1/soc/satellite-alerts/overview/")).data;
    res.status(200).json({ success: false, message: "Success", data: data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Internal error" });
  }
};


export const webAPIActivityController: RequestHandler = async (req, res, _) => {
  try {
    const data = (await axios.get("https://apps-test.ecmwf.int/webapi-activity/api/v1/stats/?token=be7276d3c5050bca87c1b45256829c6e")).data;
    res.status(200).json({ success: false, message: "Success", data: data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Internal error" });
  }
};


export const marsActivityController: RequestHandler = async (req, res, _) => {
  try {
    const data = (await axios.get("https://apps-test.ecmwf.int/mars-activity/api/v1/stats/?token=be7276d3c5050bca87c1b45256829c6e")).data;
    res.status(200).json({ success: false, message: "Success", data: data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Internal error" });
  }
};
