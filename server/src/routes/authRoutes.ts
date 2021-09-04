import { Router } from "express";

import { signupController, loginController } from "../controllers/authControllers";


const router = Router();


// * Signup
router.post("/signup", signupController);


// * Login
router.post("/login", loginController);


export default router;
