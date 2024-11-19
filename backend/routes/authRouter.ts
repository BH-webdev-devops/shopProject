import { Router} from "express";
import { registerUser, loginUser } from "../controllers/authController"
import { validateUserInput } from '../middleware/middleware'
import {upload} from '../middleware/uploadFile'

const authRouter: Router = Router()

authRouter.post("/register", upload.single('image'), validateUserInput, registerUser)
authRouter.post("/login", loginUser)

export default authRouter