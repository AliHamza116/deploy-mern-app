import { Router } from 'express';
import { signup } from "../Controllers/AuthController.js"; // ✅ Correct import
import { login } from "../Controllers/AuthController.js"; // ✅ Correct import
import { signupValidation } from "../Middlewares/AuthValidation.js"; // ✅ Correct import
import { loginValidation } from "../Middlewares/AuthValidation.js"; // ✅ Correct import

const router = Router();
router.post('/login', loginValidation, login); 
router.post('/signup', signupValidation, signup); // ✅ Now `signup` is a function

export default router;
