import { Router } from "express";

import { openChartsProducts, ping, serviceStatus } from "../controllers/widgets";


const router = Router();


// * Ping service
router.get("/ping", ping);


// * Service status - Proxy
router.get("/service-status", serviceStatus);

// * Open Charts products - Proxy
router.get("/open-charts-products", openChartsProducts);


export default router;
