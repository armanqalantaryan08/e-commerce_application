import express from 'express';
import { Request as ExpressRequest, Response, NextFunction, ErrorRequestHandler } from 'express';
import connect from './db/connect';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './docs/swagger.json';
import {seedDatabase} from "./db/seed/seed";
import authRoutes from "./routes/authRoutes";

const app = express();
const PORT = process.env.PORT || 3006;

connect();

app.use(express.json());

app.use(authRoutes);

app.use(productRoutes);

app.use(orderRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

seedDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
