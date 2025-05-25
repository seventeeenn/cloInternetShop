import express from 'express';
import cors from 'cors';
import reviewRoutes from '../entities/review/routes/review.routes';
import { errorHandler } from '../shared/middleware/errorHandler';
import registrationRoutes from '../features/auth/routes/registration.routes';
import LoginRouter from '../features/auth/routes/login.routes';
import productsRoutes from '../entities/product/routes/product.routes';

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Роуты
app.use('/api/products', productsRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/registration', registrationRoutes);
app.use('/api/login', LoginRouter);

//Обработка ошибок
app.use(errorHandler);

export default app;