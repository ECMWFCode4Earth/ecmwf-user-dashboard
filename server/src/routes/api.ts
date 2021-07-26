import { Router } from "express";

import { openchartProducts, ping, serviceStatus } from "../controllers/widgets";


const router = Router();


// * Ping service
router.get("/ping", ping);


// * Service status - Proxy
router.get("/service-status", serviceStatus);

// * Open Charts products - Proxy
router.get("/opencharts-products", openchartProducts);


export default router;
