import { Router } from "express";

import {
  openChartsProductsController,
  pingController,
  serviceStatusController,
  eventsController,
  satelliteAlertsController,
  webAPIActivityController,
  marsActivityController
} from "../controllers/widgets";


const router = Router();


// * Ping service
router.get("/ping", pingController);


// * Service status - Proxy
router.get("/service-status", serviceStatusController);


// * Open Charts products - Proxy
router.get("/open-charts-products", openChartsProductsController);


// * Events - Proxy (Uses API token)
router.get("/events", eventsController);


// * Satellite alerts - Proxy
router.get("/satellite-alerts", satelliteAlertsController);


// * Web API Activity
router.get("/webapi-activity", webAPIActivityController);


// * MARS Activity
router.get("/mars-activity", marsActivityController);


export default router;
