import { Router } from "express";

import { signupController, loginController } from "../controllers/auth";


const router = Router();


// * Signup
router.post("/signup", signupController);


// * Login
router.post('/login', loginController);


export default router;
