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
  updateApiTokensController, sharedTabController
} from "../controllers/apiControllers";


const authRouter = Router(); // Required user to be authenticated.
const noAuthRouter = Router(); // Required user to be authenticated.


// * Ping service
authRouter.get("/ping", pingController);


// * Save Tab Manager
authRouter.post("/save-tab-manager", saveTabManagerController);


// * Load Tab Manager
authRouter.get("/load-tab-manager", loadTabManagerController);


// * Clear Tab Manager
authRouter.post("/clear-tab-manager", clearTabManagerController);


// * Change password
authRouter.post("/change-password", changePasswordController);


// * Update ECMWF API Tokens
authRouter.post("/update-api-tokens", updateApiTokensController);


// * Get ECMWF API Tokens
authRouter.get("/api-tokens", apiTokensController);


// * Service status - Proxy
noAuthRouter.get("/service-status", serviceStatusController);


// * Open Charts products - Proxy
noAuthRouter.get("/open-charts/products", openChartsProductsController);


// * Events - Proxy (Uses API token)
authRouter.get("/events", eventsController);


// * Satellite alerts - Proxy
noAuthRouter.get("/satellite-alerts", satelliteAlertsController);


// * Web API Activity
authRouter.get("/web-api-activity", webApiActivityController);


// * MARS Activity
authRouter.get("/mars-activity", marsActivityController);


// * Shared Tab Details from Tab manager
authRouter.get("/shared-tab", sharedTabController);


export { authRouter, noAuthRouter };
