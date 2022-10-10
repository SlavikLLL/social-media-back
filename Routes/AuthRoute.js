import  express  from "express";
import { logInUser, registerUser } from "../Controller/AuthController.js";
const router = express.Router();



router.post('/register',registerUser)
router.post('/login',logInUser)

export default router;