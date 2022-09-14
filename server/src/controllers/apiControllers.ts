import { RequestHandler } from "express";


import { compareDesc, compareAsc, isAfter } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import axios from "axios";

import { initialTabManagerState } from "../utils/defaults";
import User from "../models/User";
import { TabManager } from "../utils/types";


export const pingController: RequestHandler = (req, res, _) => {
  res.status(200).json({ success: true, message: "Success" });
};

export const addEndPointsController: RequestHandler = (req, res, next) => {
  console.log("request received")
  console.log("endpoint: ", req.body)
  try{
    const user: any = req.user
    const endpoint = req.body.endpoint;
    if(!user || !endpoint){
      return res.status(400).json({ success: false, message: "Incomplete parameters" });
    }
    delete endpoint._id
    user.addAPIEndpoints(endpoint)
    res.status(200).json({ success: true, message: "Success" });
  } catch (err) {
    console.log(err)
    next(err);
  }
}

export const deleteEndpointController: RequestHandler = (req, res,next) =>{
  try{
    const user: any = req.user
    const endpoint = req.body.endpoint;
    if(!user || !endpoint){
      return res.status(400).json({ success: false, message: "Incomplete parameters" });
    }
    console.log("req received in controller")
    user.deleteAPIEndpoint(endpoint)

    res.status(200).json({ success: true, message: "Success" });
  } catch (err) {
    next(err);
  }
}

export const deleteAllEndpointsController: RequestHandler = (req, res, next) => {
  try{
    const user: any = req.user
    if(!user){
      return res.status(400).json({ success: false, message: "Incomplete parameters" });
    }
    console.log("req received in controller")
    user.deleteAPIEndpoints()

    res.status(200).json({ success: true, message: "Success" });
  } catch (err) {
    next(err);
  }
}

export const loadAPIEndpointsController: RequestHandler = (req, res, next) => {
  try {
    const user: any = req.user;
    const endpoints = user.loadAPIEndpoints()
    res.status(200).json({ success: true, message: "Success", data: { endpoints } });
  } catch (err) {
    next(err);
  }
}


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
    res.status(200).json({ success: true, message: "Success", data: nodes.map((node: any) => node.node) });
  } catch (err) {
    next(err);
  }
};


export const openChartsProductsController: RequestHandler = async (req, res, next) => {
  try {
    const data = (await axios.get("https://apps.ecmwf.int/webapps/opencharts-api/v1/packages/opencharts/products/")).data;
    console.log(data);
    res.status(200).json({ success: false, message: "Success", data: data });
  } catch (err) {
    next(err);
  }
};

export const getAllWidgetsController: RequestHandler = async (req, res, next) => {
  try{
    const data = (await axios.get("https://apps-dev.ecmwf.int/webapps/opencharts-api/v1/soc/user-dashboard/GetWidgets/")).data;
    res.status(200).json({success:true, message:"success", data: data.data});
  } catch (err){
    next(err);
  }
}

export const eventsController: RequestHandler = async (req, res, next) => {
  try {
    const data = (await axios.get(`https://events.ecmwf.int/export/categ/2.json?_=${process.env.EVENTS_}&ak=${process.env.EVENTS_AK}`)).data;

    const events = data.results.map((result: any) => ({
      title: result.title,
      startDate: result.startDate,
      endDate: result.endDate,
      startDateUTC: zonedTimeToUtc(`${result.startDate.date} ${result.startDate.time}`, result.startDate.tz),
      endDateUTC: zonedTimeToUtc(`${result.endDate.date} ${result.endDate.time}`, result.endDate.tz),
      category: result.category,
      organiser: result.creator.fullName,
      url: result.url
    }));

    events.sort((firstEl: any, secondEl: any) => compareDesc(firstEl.startDateUTC, secondEl.startDateUTC));

    const dateNowUTC = new Date();

    const completedEvents: any[] = [];
    const upcomingEvents: any[] = [];

    events.forEach((event: any) => {
      if (isAfter(event.startDateUTC, dateNowUTC)) {
        upcomingEvents.push(event)
      } else {
        completedEvents.push(event)
      }
    })

    upcomingEvents.sort((firstEl: any, secondEl: any) => compareAsc(firstEl.startDateUTC, secondEl.startDateUTC));

    res.status(200).json({ success: false, message: "Success", data: { completedEvents, upcomingEvents } });
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
    const axiosRes = await axios.get(`https://apps-test.ecmwf.int/webapi-activity/api/v1/stats/?token=${user.apiTokens.token2}`);
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
    const axiosRes = await axios.get(`https://apps-test.ecmwf.int/mars-activity/api/v1/stats/?token=${user.apiTokens.token2}`);
    if (axiosRes.status == 403) {
      return res.status(403).json({ success: false, message: "ECMWF API token invalid" });
    }
    const data = axiosRes.data;
    res.status(200).json({ success: false, message: "Success", data: data });
  } catch (err) {
    next(err);
  }
};


// export const sharedTabController: RequestHandler = async (req, res, next) => {
//   try {
//
//     const sharingUsername = req.query.u;
//     const tabUuid = req.query.uuid;
//
//     const viewingUser: any = req.user;
//
//     if (!sharingUsername || !tabUuid) {
//       return res.status(400).json({ success: false, message: "Incomplete parameters" });
//     }
//
//     const sharingUser = await User.findOne({ username: sharingUsername });
//
//     if (!sharingUser) {
//       return res.status(400).json({ success: false, message: "Sharing user does not exist" });
//     }
//
//
//     const tabManager = sharingUser.loadTabManager() as TabManager;
//
//     const tab = tabManager.tabs.find(tab => tab.uuid = tabUuid as string);
//
//     if (!tab) {
//       return res.status(400).json({ success: false, message: "Tab does not exist" });
//     }
//
//     let viewingUserHasViewingRight = false;
//     tab.sharedWithUsers.forEach(username => {
//       if (username === viewingUser.username) {
//         viewingUserHasViewingRight = true;
//       }
//     });
//
//     if (!viewingUserHasViewingRight) {
//       return res.status(403).json({ success: false, message: "User not authorised to view this tab." });
//     }
//
//     const widgetConfigurations = {};
//
//     tab.widgetIds.forEach((widgetId) => {
//       if (widgetId in tabManager.widgetConfigurations) {
//         (widgetConfigurations as any)[widgetId] = tabManager.widgetConfigurations[widgetId];
//       }
//     });
//
//     const data = {
//       tab,
//       widgetConfigurations
//     };
//
//     res.status(200).json({ success: false, message: "Success", data: data });
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// };
