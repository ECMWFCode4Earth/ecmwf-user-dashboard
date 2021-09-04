import { RequestHandler } from "express";
import axios from "axios";

import { initialTabManagerState } from "../utils/defaults";


export const pingController: RequestHandler = (req, res, _) => {
  res.status(200).json({ success: true, message: "Success" });
};


export const saveTabManagerController: RequestHandler = (req, res, next) => {
  try {
    const user: any = req.user;
    const tabManager = req.body.tabManager;
    if (!user || !tabManager) {
      return res.status(400).json({ success: false, message: "Incomplete parameters" });
    }
    user.saveTabManager(tabManager);
    res.status(200).json({ success: true, message: "Success" });
  } catch (err) {
    next(err);
  }
};


export const loadTabManagerController: RequestHandler = (req, res, next) => {
  try {
    const user: any = req.user;
    const tabManager = user.loadTabManager();
    res.status(200).json({ success: true, message: "Success", data: { tabManager } });
  } catch (err) {
    next(err);
  }
};


export const updateApiTokensController: RequestHandler = async (req, res, next) => {
  try {

    const apiTokens = req.body.apiTokens;

    if (!apiTokens) {
      return res.status(400).json({ success: false, message: "Incomplete parameters" });
    }

    const user: any = req.user;
    user.apiTokens.token1 = apiTokens.token1;
    user.apiTokens.token2 = apiTokens.token2;
    user.save();

    res.status(200).json({ success: true, message: "API tokens updated successfully." });

  } catch (err) {
    next(err);
  }
};


export const apiTokensController: RequestHandler = async (req, res, next) => {
  try {
    const user: any = req.user;
    const apiTokens = user.apiTokens;
    res.status(200).json({ success: true, message: "Success", data: { apiTokens } });
  } catch (err) {
    next(err);
  }
};


export const clearTabManagerController: RequestHandler = async (req, res, next) => {
  try {
    const user: any = req.user;
    user.saveTabManager(initialTabManagerState);
    res.status(200).json({ success: true, message: "Tab manager cleared successfully" });
  } catch (err) {
    next(err);
  }
};


export const serviceStatusController: RequestHandler = async (req, res, next) => {
  try {
    const data = (await axios.get("https://www.ecmwf.int/ecmwf_status/status")).data;
    const nodes = data["nodes"];
    res.status(200).json({ success: false, message: "Success", data: nodes.map((node: any) => node.node) });
  } catch (err) {
    next(err);
  }
};


export const openChartsProductsController: RequestHandler = async (req, res, next) => {
  try {
    const data = (await axios.get("https://apps.ecmwf.int/webapps/opencharts-api/v1/packages/opencharts/products/")).data;
    res.status(200).json({ success: false, message: "Success", data: data });
  } catch (err) {
    next(err);
  }
};


export const eventsController: RequestHandler = async (req, res, next) => {
  try {
    const data = (await axios.get("https://events.ecmwf.int/export/categ/2.json?_=1623050927029&ak=c430e6b8-16d4-41f3-9c57-908a0f60bd0b")).data; // TODO Extract token to env variable
    res.status(200).json({ success: false, message: "Success", data: data });
  } catch (err) {
    next(err);
  }
};


export const satelliteAlertsController: RequestHandler = async (req, res, next) => {
  try {
    const data = (await axios.get("https://apps-dev.ecmwf.int/webapps/opencharts-api/v1/soc/satellite-alerts/overview/")).data;
    res.status(200).json({ success: false, message: "Success", data: data });
  } catch (err) {
    next(err);
  }
};


export const webApiActivityController: RequestHandler = async (req, res, next) => {
  try {
    const user: any = req.user;
    const axiosRes = await axios.get("https://apps-test.ecmwf.int/webapi-activity/api/v1/stats/?token=be7276d3c5050bca87c1b45256829c6e"); // TODO Replace this with token2
    if (axiosRes.status == 403) {
      return res.status(403).json({ success: false, message: "ECMWF API token invalid" });
    }
    const data = axiosRes.data;
    res.status(200).json({ success: false, message: "Success", data: data });
  } catch (err) {
    next(err);
  }
};


export const marsActivityController: RequestHandler = async (req, res, next) => {
  try {
    const user: any = req.user;
    const axiosRes = await axios.get("https://apps-test.ecmwf.int/mars-activity/api/v1/stats/?token=be7276d3c5050bca87c1b45256829c6e"); // TODO Replace this with token2
    if (axiosRes.status == 403) {
      return res.status(403).json({ success: false, message: "ECMWF API token invalid" });
    }
    const data = axiosRes.data;
    res.status(200).json({ success: false, message: "Success", data: data });
  } catch (err) {
    next(err);
  }
};
