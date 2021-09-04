import { Router } from "express";

import { changePasswordController } from "../controllers/authControllers";
import {
  openChartsProductsController,
  pingController,
  serviceStatusController,
  eventsController,
  satelliteAlertsController,
  webApiActivityController,
  marsActivityController,
  saveTabManagerController,
  loadTabManagerController,
  clearTabManagerController,
  apiTokensController,
  updateApiTokensController
} from "../controllers/apiControllers";


const router = Router();


// * Ping service
router.get("/ping", pingController);


// * Save Tab Manager
router.post("/save-tab-manager", saveTabManagerController);


// * Load Tab Manager
router.get("/load-tab-manager", loadTabManagerController);


// * Clear Tab Manager
router.post("/clear-tab-manager", clearTabManagerController);


// * Change password
router.post("/change-password", changePasswordController);


// * Update ECMWF API Tokens
router.post("/update-api-tokens", updateApiTokensController);


// * Get ECMWF API Tokens
router.get("/api-tokens", apiTokensController);


// * Service status - Proxy
router.get("/service-status", serviceStatusController);


// * Open Charts products - Proxy
router.get("/open-charts/products", openChartsProductsController);


// * Events - Proxy (Uses API token)
router.get("/events", eventsController);


// * Satellite alerts - Proxy
router.get("/satellite-alerts", satelliteAlertsController);


// * Web API Activity
router.get("/web-api-activity", webApiActivityController);


// * MARS Activity
router.get("/mars-activity", marsActivityController);


export default router;
