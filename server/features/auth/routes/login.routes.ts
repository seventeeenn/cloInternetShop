import { Router } from 'express';
import { loginController } from '../controller/login.controller';
import { asyncHandler } from '../../../shared/lib/asyncHandler';

const LoginRouter = Router();

// Маршрут для логина: POST /api/login
LoginRouter.post('/', asyncHandler(loginController));

export default LoginRouter;