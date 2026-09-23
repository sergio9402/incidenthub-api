import express, { Application } from 'express';
import incidentRoutes from './routes/incident.routes';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { requestInfoMiddleware } from './middlewares/request-info.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import { notFoundMiddleware } from './middlewares/not-found.middleware';

const app: Application = express();

// Middlewares globales
app.use(express.json());
app.use(loggerMiddleware);
app.use(requestInfoMiddleware);

// Rutas principales
app.use('/api/incidents', incidentRoutes);

// Manejo de rutas inexistentes (404)
app.use(notFoundMiddleware);

// Middleware centralizado de errores
app.use(errorMiddleware);

export default app;