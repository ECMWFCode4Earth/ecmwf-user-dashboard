import { Router } from "express";

import { openChartsProducts, ping, serviceStatus, events, satelliteAlerts } from "../controllers/widgets";


const router = Router();


// * Ping service
router.get("/ping", ping);


// * Service status - Proxy
router.get("/service-status", serviceStatus);


// * Open Charts products - Proxy
router.get("/open-charts-products", openChartsProducts);


// * Events - Proxy (Uses API token)
router.get("/events", events);


// * Satellite alerts - Proxy
router.get("/satellite-alerts", satelliteAlerts);


export default router;
