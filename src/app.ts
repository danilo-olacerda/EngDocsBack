import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import router from './routes/router';
import errorHandler from './middlewares/errorMiddleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(errorHandler);

export default app;