import express from 'express';
import cors from 'cors';


import reviewRoutes from '../entities/review/routes/review.routes';
import { errorHandler } from '../shared/middleware/errorHandler';
import registrationRoutes from '../features/auth/routes/registration.routes';
import { authRouter } from '../features/auth/routes/login.routes';//

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Роуты
// Роуты
// Подключаем маршруты авторизации под префиксом /api
app.use('/api', authRouter);
app.use('/api/reviews', reviewRoutes);
app.use('api/registation', registrationRoutes)

// Middleware - глобальная обработка ошибок 
app.use(errorHandler);

export default app;